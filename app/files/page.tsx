"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getUserFiles, deleteFile, type UploadedFile } from "@/lib/file-upload"
import { Trash2, Download, Calendar, FileText, Image, FileSpreadsheet } from "lucide-react"
import Link from "next/link"

export default function FilesPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingFile, setDeletingFile] = useState<string | null>(null)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      setLoading(true)
      const userFiles = await getUserFiles()
      setFiles(userFiles)
    } catch (err) {
      setError('Failed to load files. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return
    
    try {
      setDeletingFile(fileId)
      await deleteFile(fileId)
      setFiles(prev => prev.filter(f => f.id !== fileId))
    } catch (err) {
      setError('Failed to delete file. Please try again.')
    } finally {
      setDeletingFile(null)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <Image className="w-5 h-5" />
    if (fileType.includes('pdf')) return <FileText className="w-5 h-5" />
    if (fileType.includes('spreadsheet') || fileType.includes('csv')) return <FileSpreadsheet className="w-5 h-5" />
    return <FileText className="w-5 h-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your files...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Files</h1>
            <p className="text-muted-foreground mt-2">
              Manage your uploaded study materials and create your schedule
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-600">{error}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-700"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Make Schedule Button */}
        {files.length > 0 && (
          <div className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  Ready to organize your study schedule?
                </h2>
                <p className="text-muted-foreground">
                  Use your uploaded materials to create a personalized study plan
                </p>
              </div>
              <Link href="/schedule">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Calendar className="w-5 h-5 mr-2" />
                  Make My Schedule
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Files List */}
        {files.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No files uploaded yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your study materials to get started
            </p>
            <Link href="/">
              <Button>
                Upload Files
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Uploaded Files ({files.length})</h2>
            {files.map((file) => (
              <div 
                key={file.id} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground gap-1 sm:gap-0">
                      <span>{formatFileSize(file.size)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{formatDate(file.uploaded_at)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFile(file.id)}
                    disabled={deletingFile === file.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Delete file"
                  >
                    {deletingFile === file.id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
