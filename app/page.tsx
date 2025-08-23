"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DynamicGradientBackground } from "@/components/landing/dynamic-gradient"
import { uploadFile, type UploadedFile, FileUploadError } from "@/lib/file-upload"

export default function LandingPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)

    try {
      const uploadPromises = Array.from(files).map(file => uploadFile(file))
      const results = await Promise.all(uploadPromises)
      
      setUploadedFiles(prev => [...results, ...prev])
      
      // Clear the input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (err) {
      if (err instanceof FileUploadError) {
        setError(err.message)
      } else {
        setError('Upload failed. Please try again.')
      }
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center px-6 relative overflow-hidden">
      <DynamicGradientBackground />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="flex w-full items-center justify-between gap-12">
          <div className="max-w-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Oranu
              </h1>
            </div>
            <p className="text-lg text-white/80">
              Master your study habits with simple, effective tools.
            </p>
          </div>
          <div className="shrink-0">
            <div 
              className="w-72 h-60 border-2 border-dashed border-white/30 rounded-lg bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center transition-all duration-200 hover:border-white/50 hover:bg-white/10"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                  <p className="text-white/80 text-sm">Uploading...</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-sm mb-2">Drop your schedule & study materials here</p>
                  <label htmlFor="file-upload" className="text-white/60 text-xs cursor-pointer hover:text-white/80 transition-colors">
                    or click to browse files
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </>
              )}
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-200 text-xs">
                {error}
              </div>
            )}
            
            {/* Uploaded files list */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-white/60 text-xs">Recently uploaded:</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {uploadedFiles.slice(0, 3).map((file) => (
                    <div key={file.id} className="flex items-center justify-between text-xs bg-white/5 rounded px-2 py-1">
                      <span className="text-white/80 truncate flex-1">{file.name}</span>
                      <span className="text-white/60 ml-2">{(file.size / 1024 / 1024).toFixed(2)}MB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
