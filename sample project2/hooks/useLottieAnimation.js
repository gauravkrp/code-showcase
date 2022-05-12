import { useEffect, useRef } from 'react'
import get from 'lodash/get'
import each from 'lodash/each'
import isEmpty from 'lodash/isEmpty'
import lottie from 'lottie-web'
import gsap from 'gsap'

function makeLottieTween (animationItem) {
  const tweener = { value: animationItem.currentFrame }
  const duration = animationItem.getDuration()
  const toValue = animationItem.totalFrames - 1
  let tween = gsap.fromTo(
    tweener,
    { value: 0 },
    {
      value: toValue,
      duration,
      ease: 'none',
      paused: animationItem.isPaused,
      onUpdate () {
        animationItem.goToAndStop(tweener.value, true)
      }
    }
  )
  const markers = get(animationItem, ['animationData', 'markers'])
  if (!isEmpty(markers)) {
    const timeline = gsap.timeline({
      paused: animationItem.isPaused
    }).add(tween, 0)
    tween.resume()
    each(get(animationItem, ['animationData', 'markers']), ({ tm: frame, cm: label }) => {
      timeline.addLabel(label, duration * (frame / toValue))
    })
    tween = timeline
  }
  tween.lottieAnimationItem = animationItem
  return tween
}

export default function useLottieAnimation (tweenRef, animationData) {
  const targetRef = useRef()
  useEffect(() => {
    const animationItem = lottie.loadAnimation({
      container: targetRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData
    })
    tweenRef.current = makeLottieTween(animationItem)
    return () => {
      tweenRef.current.kill()
      tweenRef.current.lottieAnimationItem.destroy()
    }
  }, [])

  return targetRef
}
