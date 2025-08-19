import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DynamicGradientBackground } from "@/components/landing/dynamic-gradient"

export default function LandingPage() {
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
            <div className="w-72 h-60 border-2 border-dashed border-white/30 rounded-lg bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-white/80 text-sm mb-2">Drop your schedule & study materials here</p>
              <p className="text-white/60 text-xs">or click to browse files</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
