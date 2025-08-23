

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

  // For demo purposes, create a mock uploaded file
  const mockFile: UploadedFile = {
    id: `demo-${Date.now()}`,
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file), // Create a local URL for demo
    uploaded_at: new Date().toISOString()
  }

  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return mockFile
}

export const getUserFiles = async (): Promise<UploadedFile[]> => {
  // For demo purposes, return mock files
  const mockFiles: UploadedFile[] = [
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

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return mockFiles
}

export const deleteFile = async (fileId: string): Promise<void> => {
  // For demo purposes, just simulate deletion
  console.log(`Demo: Deleting file with ID: ${fileId}`)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In a real app, this would delete from Supabase
  // For now, we just return successfully
}
