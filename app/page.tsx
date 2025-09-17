"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DynamicGradientBackground } from "@/components/landing/dynamic-gradient"
import { uploadFile } from "@/lib/file-upload"

export default function LandingPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warningClickCount, setWarningClickCount] = useState(0)

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)

    try {
      const uploadPromises = Array.from(files).map(file => uploadFile(file))
      await Promise.all(uploadPromises)
      
      // Clear the input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
      // Redirect to files page after successful upload
      router.push('/files')
      
    } catch (err) {
      console.error('Upload error:', err)
      setError('Upload failed. Please try again.')
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

  const handleWarningClick = () => {
    const newCount = warningClickCount + 1
    setWarningClickCount(newCount)
    
    if (newCount >= 3) {
      // Navigate to files page after 3 clicks
      router.push('/files')
    }
  }

  return (
    <div className="min-h-screen flex items-center px-4 sm:px-6 relative overflow-hidden">
      <DynamicGradientBackground />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-8 lg:gap-12">
          <div className="max-w-lg space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Oranu
              </h1>
            </div>
            <p className="text-lg text-white/80">
              Master your study habits with simple, effective tools.
            </p>
          </div>
          <div className="shrink-0 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Development Warning Banner */}
              <div 
                className="absolute -top-12 left-0 right-0 z-20 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 text-center cursor-pointer hover:bg-yellow-500/30 transition-colors"
                onClick={handleWarningClick}
                title="Click 3 times to skip to files page"
              >
                <div className="flex items-center justify-center gap-2 text-yellow-200 text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>
                    ⚠️ Development Mode - Do not upload sensitive information
                    {warningClickCount > 0 && (
                      <span className="ml-2 text-yellow-300">
                        ({warningClickCount}/3)
                      </span>
                    )}
                  </span>
                </div>
              </div>
              
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
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-200 text-xs">
                {error}
              </div>
            )}
            

            

          </div>
        </div>
      </div>
    </div>
  )
}
