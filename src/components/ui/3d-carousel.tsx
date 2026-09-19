"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion'
import './3d-carousel.css'

type Photo = { src: string; alt: string }

export function ThreeDPhotoCarousel({ photos }: { photos: Photo[] }) {
  const [position, setPosition] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const dragged = useRef(false)
  const stage = useRef<HTMLDivElement>(null)
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressClickUntil = useRef(0)
  const rotation = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const count = photos.length
  const selected = count ? ((position % count) + count) % count : 0
  const step = 360 / Math.max(1, count)
  const settle = useCallback((angle: number) => {
    const next = Math.round(-angle / step)
    setPosition(next)
    rotation.stop()
    animate(rotation, -next * step, reduceMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 160, damping: 28, mass: 0.7 })
  }, [rotation, step, reduceMotion])

  useEffect(() => {
    const element = stage.current
    if (!element || active !== null) return
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return // Preserve trackpad pinch zoom.
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (!delta) return
      event.preventDefault()
      rotation.stop()
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1
      rotation.set(rotation.get() - Math.max(-100, Math.min(100, delta * scale)) * 0.12)
      suppressClickUntil.current = Date.now() + 250
      if (wheelTimer.current) clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => settle(rotation.get()), 160)
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => {
      element.removeEventListener('wheel', wheel)
      if (wheelTimer.current) clearTimeout(wheelTimer.current)
    }
  }, [active, rotation, settle])

  useEffect(() => {
    if (active === null || !dialog.current) return
    dialog.current.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [active])

  const close = () => {
    dialog.current?.close()
    setActive(null)
    opener.current?.focus()
  }

  if (!count) return null

  return (
    <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label="Graduation portraits">
      <motion.div ref={stage} className="photo-carousel__stage"
        onPanStart={() => {
          dragged.current = true
          rotation.stop()
          if (wheelTimer.current) clearTimeout(wheelTimer.current)
        }}
        onPan={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.18)}
        onPanEnd={(_, info) => {
          suppressClickUntil.current = Date.now() + 300
          dragged.current = false
          settle(rotation.get() + Math.max(-step, Math.min(step, info.velocity.x * 0.025)))
        }}
      >
        <motion.div
          className="photo-carousel__ring"
          style={{ rotateY: rotation }}
        >
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.src}
              className="photo-carousel__face"
              style={{ transform: `rotateY(${index * 360 / count}deg) translateZ(var(--carousel-radius))` }}
              tabIndex={selected === index ? 0 : -1}
              aria-hidden={selected !== index}
              aria-label={`Open portrait ${index + 1} of ${count}`}
              onClick={event => {
                if (dragged.current || Date.now() < suppressClickUntil.current) return
                opener.current = event.currentTarget
                setActive(index)
              }}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
            </button>
          ))}
        </motion.div>
      </motion.div>
      <div className="photo-carousel__controls">
        <button type="button" title="Previous photo" onClick={() => settle(-position * step + step)} aria-label="Previous graduation portrait"><span aria-hidden="true">←</span></button>
        <span aria-live="polite">{String(selected + 1).padStart(2, '0')} <span>/ {count}</span></span>
        <button type="button" title="Next photo" onClick={() => settle(-position * step - step)} aria-label="Next graduation portrait"><span aria-hidden="true">→</span></button>
      </div>
      <p className="photo-carousel__hint">Drag, swipe or scroll with two fingers · Tap a photo to enlarge</p>
      {active !== null && (
        <dialog ref={dialog} className="photo-carousel__dialog" aria-label="Graduation photo viewer" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }}>
          <button type="button" className="photo-carousel__close" onClick={close} autoFocus aria-label="Close photo viewer">✕</button>
          <img src={photos[active].src} alt={photos[active].alt} />
          <a href={photos[active].src} target="_blank" rel="noreferrer">Open original photo ↗</a>
        </dialog>
      )}
    </div>
  )
}
