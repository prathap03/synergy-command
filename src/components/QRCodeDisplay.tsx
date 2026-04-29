'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRCodeDisplay() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    setUrl(`${base}/display`)
  }, [])

  if (!url) return null

  return (
    <div className="flex flex-col items-center gap-3 bg-white rounded-2xl p-5 shadow-xl">
      <QRCodeSVG value={url} size={180} level="H" includeMargin={false} />
      <div className="text-center">
        <p className="text-gray-800 font-bold text-sm">Scan to join live! 📱</p>
        <p className="text-gray-400 text-xs break-all mt-1">{url}</p>
      </div>
    </div>
  )
}
