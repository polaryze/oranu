"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Brain, TrendingUp, Users, Settings, Menu, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Study", href: "/study", icon: Brain },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Friends", href: "/friends", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button - Bottom Right */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed bottom-6 right-6 z-50 md:hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-300 ease-in-out flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <Menu 
            className={cn(
              "absolute h-5 w-5 transition-all duration-300 ease-in-out",
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )} 
          />
          <X 
            className={cn(
              "absolute h-5 w-5 transition-all duration-300 ease-in-out",
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )} 
          />
        </div>
      </Button>

      {/* Mobile Sidebar Popup - Bottom Right */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 md:hidden animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 min-w-[200px] animate-in zoom-in-95 duration-300">
            <div className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 animate-in slide-in-from-right-2 fade-in",
                      isActive
                        ? "bg-white/20 text-white border border-white/30"
                        : "text-white/80 hover:bg-white/10 hover:text-white",
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />}
    </>
  )
}
