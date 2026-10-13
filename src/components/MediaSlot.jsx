import { useState } from 'react'
import { asset } from '../lib/asset'

// Shows a photo from /public if it exists, otherwise whatever `fallback` is.
// Pass fallback={null} to render nothing until a photo is added.
export default function MediaSlot({ src, alt, fallback = null, className = '', onLoaded }) {
  const [ok, setOk] = useState(false)
  const [failed, setFailed] = useState(!src)

  return (
    <>
      {!failed && (
        <img
          className={`${className}${ok ? '' : ' is-probing'}`}
          src={asset(src)}
          alt={alt}
          onLoad={() => {
            setOk(true)
            onLoaded?.(true)
          }}
          onError={() => {
            setFailed(true)
            onLoaded?.(false)
          }}
        />
      )}
      {!ok && fallback}
    </>
  )
}
