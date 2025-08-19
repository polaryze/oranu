"use client"

import { useEffect, useRef } from "react"

export function DynamicGradientBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return

    // Defaults
    let currentA = 230
    let targetA = currentA

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // Helpers
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
    const shortestDiff = (a: number, b: number) => ((b - a + 540) % 360) - 180

    const updateAngle = () => {
      el.style.setProperty("--ga", `${currentA}deg`)
    }

    // RAF loop for buttery motion
    let raf = 0
    let lastTs = performance.now()
    let spinActive = false
    let spinStart = 0
    let spinDuration = 600
    let spinStartAngle = 0

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (ts: number) => {
      const dt = Math.max(0.001, (ts - lastTs) / 1000)
      lastTs = ts

      // Max speeds (units per second)
      const MAX_ANGLE_SPEED = 540 // deg per second (snappy but controlled)

      if (spinActive) {
        const progress = clamp((ts - spinStart) / spinDuration, 0, 1)
        const eased = easeOutCubic(progress)
        currentA = spinStartAngle + 360 * eased
        if (progress >= 1) {
          spinActive = false
          currentA = (spinStartAngle + 360) % 360
        }
      } else {
        const aDiff = shortestDiff(currentA, targetA)
        const stepA = clamp(aDiff * 0.4, -MAX_ANGLE_SPEED * dt, MAX_ANGLE_SPEED * dt)
        currentA += stepA
      }

      updateAngle()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX
      const y = e.clientY
      // Position: follow pointer immediately (no delay)
      const xPerc = (x / window.innerWidth) * 100
      const yPerc = (y / window.innerHeight) * 100
      el.style.setProperty("--gx", `${xPerc}%`)
      el.style.setProperty("--gy", `${yPerc}%`)

      // Angle based on pointer position relative to viewport center for stability
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      let angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI
      if (angle < 0) angle += 360
      targetA = angle
    }

    const onLeave = () => {
      // Ease back to a pleasant resting state
      targetA = 230
      el.style.setProperty("--gx", `20%`)
      el.style.setProperty("--gy", `30%`)
    }

    const onDown = () => {
      // Trigger a satisfying full sweep
      if (!spinActive) {
        spinActive = true
        spinStart = performance.now()
        spinStartAngle = currentA
      }
    }

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerleave", onLeave)
      window.addEventListener("pointerdown", onDown)
      raf = requestAnimationFrame(tick)
    } else {
      updateAngle()
    }

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("pointerdown", onDown)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={bgRef}
      className="absolute inset-0"
      style={{
        background:
          "conic-gradient(from var(--ga, 230deg) at var(--gx, 20%) var(--gy, 30%), #000000 0deg, #0F0C1B 110deg, #441700 220deg, #B87333 310deg, #000000 360deg), radial-gradient(900px 700px at 85% 80%, rgba(184,115,51,0.35) 0%, transparent 60%)",
        filter: "saturate(1) contrast(1.08)",
        transition: "none",
      }}
    />
  )
}


