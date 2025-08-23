

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
  
  try {
    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const uniqueFileName = `public/${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`

    // Upload file to Supabase Storage (public bucket, no auth required)
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

    // Create the uploaded file object
    const uploadedFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: urlData.publicUrl,
      uploaded_at: new Date().toISOString()
    }

    // Add to our in-memory storage for immediate display
    uploadedFiles.unshift(uploadedFile)

    return uploadedFile
  } catch (error) {
    console.error('Upload error:', error)
    throw new FileUploadError('Upload failed. Please try again.', 'UPLOAD_FAILED')
  }
}

// Store uploaded files in memory for demo purposes
let uploadedFiles: UploadedFile[] = [
  {
    id: 'demo-1',
    name: 'Study Schedule.pdf',
    size: 1024 * 1024, // 1MB
    type: 'application/pdf',
    url: '#',
    uploaded_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 'demo-2',
    name: 'Math Notes.docx',
    size: 512 * 1024, // 512KB
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: '#',
    uploaded_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
]

export const getUserFiles = async (): Promise<UploadedFile[]> => {
  const supabase = createClient()
  
  try {
    // List all files from the uploads bucket
    const { data, error } = await supabase.storage
      .from('uploads')
      .list('public', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Error fetching files:', error)
      // Fall back to in-memory files if Supabase fails
      return uploadedFiles
    }

    // Convert storage files to our UploadedFile format
    const supabaseFiles: UploadedFile[] = data
      .filter(item => item.name !== '.emptyFolderPlaceholder')
      .map(item => ({
        id: item.id || `file-${Date.now()}-${Math.random()}`,
        name: item.name,
        size: item.metadata?.size || 0,
        type: item.metadata?.mimetype || 'application/octet-stream',
        url: supabase.storage.from('uploads').getPublicUrl(`public/${item.name}`).data.publicUrl,
        uploaded_at: item.updated_at || new Date().toISOString()
      }))

    // Combine Supabase files with any in-memory files
    const allFiles = [...supabaseFiles, ...uploadedFiles.filter(file => 
      !supabaseFiles.some(sf => sf.name === file.name)
    )]

    return allFiles
  } catch (error) {
    console.error('Error fetching files:', error)
    // Fall back to in-memory files if there's an error
    return uploadedFiles
  }
}

export const deleteFile = async (fileId: string): Promise<void> => {
  const supabase = createClient()
  
  try {
    // Find the file to get its path
    const fileToDelete = uploadedFiles.find(file => file.id === fileId)
    
    if (fileToDelete) {
      // Extract filename from URL or use the name
      const fileName = fileToDelete.name
      const filePath = `public/${fileName}`
      
      // Delete from Supabase storage
      const { error } = await supabase.storage
        .from('uploads')
        .remove([filePath])
      
      if (error) {
        console.error('Error deleting from storage:', error)
      }
    }
    
    // Remove from in-memory storage
    uploadedFiles = uploadedFiles.filter(file => file.id !== fileId)
    
    console.log(`Deleted file with ID: ${fileId}`)
  } catch (error) {
    console.error('Error deleting file:', error)
    // Still remove from in-memory storage even if Supabase fails
    uploadedFiles = uploadedFiles.filter(file => file.id !== fileId)
  }
}
