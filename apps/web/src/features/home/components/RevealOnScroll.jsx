import { useEffect, useRef, useState } from 'react'

export default function RevealOnScroll({ children, className = '', delay = 0 }) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver !== 'function',
  )

  useEffect(() => {
    const element = elementRef.current

    if (
      !element ||
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver !== 'function'
    ) {
      setIsVisible(true)
      return undefined
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -32px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'} ${className}`}
      style={isVisible && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
