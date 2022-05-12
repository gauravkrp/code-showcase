/* global ResizeObserver */
import { useEffect } from 'react';

const useResizeObserver = (ref, callback) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      callback(entries[0].contentRect)
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref, callback]);
}

export default useResizeObserver;
