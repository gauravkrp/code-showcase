import useWindowEvent from './useWindowEvent'

const useWindowResize = (cb) => useWindowEvent('resize', cb)

export default useWindowResize
