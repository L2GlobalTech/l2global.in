'use client'

import { useEffect } from 'react'

export default function AOSProvider() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.default.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,    
        mirror: true,
        offset: 120,
      })
    })
  }, [])

  return null
}
