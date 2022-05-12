import { useCallback, useRef } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default function useBodyScrollLock (locked, options = {}) {
  const state = useRef({ el: null, locked })

  return useCallback((el) => {
    if (el && locked) {
      disableBodyScroll(el, { reserveScrollBarGap: true, ...options })
    }

    const { el: prevEl, locked: prevLocked } = state.current
    if (prevEl && prevLocked) {
      enableBodyScroll(prevEl)
    }

    state.current.el = el
    state.current.locked = locked
  }, [locked])
}
