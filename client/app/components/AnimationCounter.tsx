'use client'

import { useRef } from 'react'
import { animate, KeyframeOptions, useInView, useIsomorphicLayoutEffect } from 'framer-motion'

type AnimationCounterProps = {
  start: number
  end: number
  animationOptions?: KeyframeOptions

}

const AnimationCounter = ({
  start,
  end,
  animationOptions,
}: AnimationCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true }) // Assuming you have a way to check if the element is in view
  
  useIsomorphicLayoutEffect(() => {
      const element = ref.current
      if (!element) return;
        if (!inView) return; // If not in view, do nothing
      
      element.textContent = String(start)
      
      animate(start, end, {
          duration: 1.5,
          ease: "easeOut",
          ...animationOptions,
          onUpdate: (value) => {
              element.textContent = value.toFixed(0)
            }
        })
        
    }, [start, end, ,inView, animationOptions])
    
  return <span ref={ref} />
}

export default AnimationCounter