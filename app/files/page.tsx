"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getUserFiles, deleteFile, type UploadedFile } from "@/lib/file-upload"
import { Trash2, Download, Calendar, FileText, Image, FileSpreadsheet, Upload, FolderOpen, Sparkles, ArrowLeft, MoreVertical, Eye } from "lucide-react"
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent/40 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Loading your files</h3>
          <p className="text-muted-foreground">Organizing your study materials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        {/* Modern Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <FolderOpen className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                My Files
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                Your personal study library
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{files.length} files uploaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Ready for AI processing</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link href="/">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload More
                </Button>
              </Link>
            </div>
          </div>
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

        {/* AI Schedule Creation Card */}
        {files.length > 0 && (
          <div className="mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl"></div>
            <div className="relative p-6 sm:p-8 border border-primary/20 rounded-2xl backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      AI-Powered Study Schedule
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Let our AI analyze your materials and create a personalized study plan tailored to your learning style
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Ready to process {files.length} files</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Estimated 2-3 minutes</span>
                    </div>
                  </div>
                </div>
                <Link href="/schedule">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-auto">
                    <Calendar className="w-5 h-5 mr-2" />
                    Create My Schedule
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Files List */}
        {files.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Your Study Library Awaits</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Upload your study materials and let our AI create a personalized learning experience for you
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Upload className="w-5 h-5 mr-2" />
                Upload Your First Files
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Files</h2>
              <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                {files.length} {files.length === 1 ? 'file' : 'files'}
              </div>
            </div>
            
            <div className="grid gap-4">
              {files.map((file, index) => (
                <div 
                  key={file.id} 
                  className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate text-lg">{file.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {formatFileSize(file.size)}
                            </span>
                            <span>•</span>
                            <span>{formatDate(file.uploaded_at)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="View file"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file.id)}
                          disabled={deletingFile === file.id}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg"
                          title="Delete file"
                        >
                          {deletingFile === file.id ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar for visual appeal */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
