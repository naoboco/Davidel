import { useState } from 'react'
import { LOGO } from '../data/siteData'

export default function BrandLogo({ className = '' }) {
  const [failed, setFailed] = useState(false)

  return failed ? (
    <span className={`brand-wordmark ${className}`} dir="ltr">DAVIDEL</span>
  ) : (
    <img className={className} src={LOGO} alt="DAVIDEL" onError={() => setFailed(true)} />
  )
}
