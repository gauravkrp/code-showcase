import { useEffect, useRef, useCallback } from 'react'
import style from 'dom-helpers/css'
import FontFaceObserver from 'fontfaceobserver'
import trim from 'lodash/trim'
import first from 'lodash/first'

export default function useWebFontLoaded (onLoaded) {
  const ref = useRef()
  const onLoadedRef = useRef()

  const hookOnLoaded = useCallback(() => {
    if (onLoadedRef.current) {
      onLoadedRef.current(null)
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      const family = trim(first(style(ref.current, 'fontFamily').split(/,\s*/)), '\'"')
      const weight = style(ref.current, 'fontWeight')
      const loader = new FontFaceObserver(family, { weight })
      onLoadedRef.current = onLoaded
      loader.load().then(hookOnLoaded).catch(hookOnLoaded)
    }
    return () => {
      onLoadedRef.current = null
    }
  }, [onLoaded])

  return ref
}
