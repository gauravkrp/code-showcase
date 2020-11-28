import { useEffect, useRef } from 'react'
import useLottieAnimation from './useLottieAnimation'

export default function useReversingLottieAnimation (animationData, forwards) {
  const tweenRef = useRef()
  const targetRef = useLottieAnimation(tweenRef, animationData)

  useEffect(() => {
    if (tweenRef.current) {
      tweenRef.current.reversed(!forwards).resume()
    }
  }, [forwards])

  return targetRef
}
