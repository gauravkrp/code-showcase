import { useRef, useState, useEffect } from 'react'

export default () => {
  const [hover, setHover] = useState()
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      const onEnter = () => { setHover(true) }
      const onLeave = () => { setHover(false) }
      ref.current.addEventListener('mouseenter', onEnter)
      ref.current.addEventListener('mouseleave', onLeave)
      return () => {
        ref.current.removeEventListener('mouseenter', onEnter)
        ref.current.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [])
  return {
    ref,
    hover
  }
}
