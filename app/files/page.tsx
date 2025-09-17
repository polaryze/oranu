"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getUserFiles, deleteFile, type UploadedFile } from "@/lib/file-upload"
import { Trash2, Download, Calendar, FileText, Image, FileSpreadsheet, Upload, FolderOpen, Sparkles, ArrowLeft, MoreVertical, Eye, LayoutDashboard, Plus } from "lucide-react"
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

      <div className="relative z-10 flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  AI Study Planner
                </h1>
              </div>
            </div>
            
            <Link href="/">
              <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:border-primary/30">
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">

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

            {/* Main AI Schedule Creation Area */}
            <div className="max-w-4xl mx-auto">
              {files.length > 0 ? (
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl"></div>
                  <div className="relative p-8 sm:p-12 border border-primary/20 rounded-3xl backdrop-blur-sm">
                    <div className="text-center space-y-8">
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                          Ready to Create Your Study Plan?
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                          Our AI will analyze your {files.length} uploaded files and create a personalized study schedule tailored to your learning style and goals.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground">Analyze Content</h3>
                          <p className="text-sm text-muted-foreground">Extract key topics and concepts</p>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto">
                            <Calendar className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="font-semibold text-foreground">Create Schedule</h3>
                          <p className="text-sm text-muted-foreground">Optimize study sessions</p>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto">
                            <Sparkles className="w-6 h-6 text-secondary" />
                          </div>
                          <h3 className="font-semibold text-foreground">Personalize</h3>
                          <p className="text-sm text-muted-foreground">Adapt to your learning style</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{files.length} files ready</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2-3 minutes processing</span>
                          </div>
                        </div>
                        
                        <Link href="/schedule">
                          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg">
                            <Sparkles className="w-5 h-5 mr-2" />
                            Create My AI Study Plan
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-12 h-12 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Upload Files to Get Started</h3>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                    Upload your study materials to create an AI-powered study plan
                  </p>
                  <Link href="/">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Your First Files
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Files Sidebar */}
        <div className="w-80 border-l border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Your Files</h3>
              <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                {files.length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Uploaded study materials ready for AI processing
            </p>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            {files.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">No files uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div 
                    key={file.id} 
                    className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-card"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate text-sm">{file.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span>{formatDate(file.uploaded_at)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                            title="View file"
                          >
                            <Eye className="w-3 h-3" />
                          </a>
                          <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                            title="Download file"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                            disabled={deletingFile === file.id}
                            className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded h-auto"
                            title="Delete file"
                          >
                            {deletingFile === file.id ? (
                              <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
