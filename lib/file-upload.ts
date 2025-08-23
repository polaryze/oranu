

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

  // Create the uploaded file object
  const uploadedFile: UploadedFile = {
    id: `demo-${Date.now()}`,
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file), // Create a local URL for demo
    uploaded_at: new Date().toISOString()
  }

  // Add to our in-memory storage
  uploadedFiles.unshift(uploadedFile) // Add to beginning of array

  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return uploadedFile
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return uploadedFiles
}

export const deleteFile = async (fileId: string): Promise<void> => {
  // Remove file from our in-memory storage
  uploadedFiles = uploadedFiles.filter(file => file.id !== fileId)
  
  console.log(`Demo: Deleted file with ID: ${fileId}`)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
}
