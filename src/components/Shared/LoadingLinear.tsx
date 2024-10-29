'use client'
import React from 'react'

export function LoadingLinear() {
  return (
    <span className="relative flex size-3">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-600 opacity-75"></span>
      <span className="relative inline-flex size-3 rounded-full bg-sky-800"></span>
    </span>
  )
}
