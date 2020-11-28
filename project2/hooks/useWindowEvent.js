import { useEffect } from 'react'

/**
 * Static store
 * We ensure there's only one of each type
 */
export const store = () => {}
store.events = {}

/**
 * Mapping event
 * Because window events are unik, we can add
 * intensive getters to the returned event.
 */
const map = (e) => {
  switch (e.type) {
    case 'scroll':
      e.pageYOffset = window.pageYOffset
      break
    case 'resize':
      e.innerWidth = window.innerWidth
      e.innerHeight = window.innerHeight
      break
  }
  return e
}

/**
 * useWindowEvent
 */
const useWindowEvent = (eventName, cb, triggerInit = false) => {
  useEffect(() => {
    if (cb && eventName) {
      if (!store.events[eventName]) {
        const event = { cbs: [cb] }
        event.cb = (e) => event.cbs.forEach(cb => { cb(map(e)) })
        window.addEventListener(eventName, event.cb)
        store.events[eventName] = event
        triggerInit && event.cb({ type: eventName })
      } else store.events[eventName].cbs.push(cb)
    }

    return () => {
      // cleanup event
      if (eventName) {
        const event = store.events[eventName]
        if (event) {
          const index = event.cbs.indexOf(cb)
          if (index !== -1) {
            event.cbs.splice(index, 1)
            if (event.cbs.length === 0) {
              window.removeEventListener(eventName, event.cb)
              store.events[eventName] = null
            }
          }
        }
      }
    }
  }, [eventName])
}

export default useWindowEvent
