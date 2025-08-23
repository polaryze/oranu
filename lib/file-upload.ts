import { createClient } from './supabase'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploaded_at: string
}

export class FileUploadError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'FileUploadError'
  }
}

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new FileUploadError(
      `File size exceeds 5MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
      'FILE_TOO_LARGE'
    )
  }

  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  // If user is not authenticated, we'll handle this differently
  if (userError || !user) {
    // For landing page, we can either:
    // 1. Store files temporarily without user association
    // 2. Prompt user to sign in
    // For now, let's prompt to sign in
    throw new FileUploadError('Please sign in to upload files', 'SIGN_IN_REQUIRED')
  }

  // Generate unique filename
  const timestamp = Date.now()
  const fileExtension = file.name.split('.').pop()
  const uniqueFileName = `${user.id}/${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(uniqueFileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Storage upload error:', error)
    throw new FileUploadError(`Upload failed: ${error.message}`, 'UPLOAD_FAILED')
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(uniqueFileName)

  // Store file metadata in database
  const { data: dbData, error: dbError } = await supabase
    .from('files')
    .insert({
      user_id: user.id,
      name: file.name,
      size: file.size,
      type: file.type,
      storage_path: uniqueFileName,
      public_url: urlData.publicUrl
    })
    .select()
    .single()

  if (dbError) {
    console.error('Database insert error:', dbError)
    // Try to clean up the uploaded file if database insert fails
    await supabase.storage.from('uploads').remove([uniqueFileName])
    throw new FileUploadError(`Failed to save file metadata: ${dbError.message}`, 'DATABASE_ERROR')
  }

  return {
    id: dbData.id,
    name: dbData.name,
    size: dbData.size,
    type: dbData.type,
    url: dbData.public_url,
    uploaded_at: dbData.created_at
  }
}

export const getUserFiles = async (): Promise<UploadedFile[]> => {
  const supabase = createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new FileUploadError('User not authenticated', 'UNAUTHORIZED')
  }

  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new FileUploadError(`Failed to fetch files: ${error.message}`, 'FETCH_FAILED')
  }

  return data.map(file => ({
    id: file.id,
    name: file.name,
    size: file.size,
    type: file.type,
    url: file.public_url,
    uploaded_at: file.created_at
  }))
}

export const deleteFile = async (fileId: string): Promise<void> => {
  const supabase = createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new FileUploadError('User not authenticated', 'UNAUTHORIZED')
  }

  // Get file info first
  const { data: file, error: fetchError } = await supabase
    .from('files')
    .select('*')
    .eq('id', fileId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !file) {
    throw new FileUploadError('File not found or access denied', 'NOT_FOUND')
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('uploads')
    .remove([file.storage_path])

  if (storageError) {
    console.error('Storage delete error:', storageError)
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('files')
    .delete()
    .eq('id', fileId)
    .eq('user_id', user.id)

  if (dbError) {
    throw new FileUploadError(`Failed to delete file: ${dbError.message}`, 'DELETE_FAILED')
  }
}
