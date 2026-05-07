import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getTransform = () => {
    switch (direction) {
      case 'up': return { y: 40, x: 0 };
      case 'down': return { y: -40, x: 0 };
      case 'left': return { y: 0, x: 40 };
      case 'right': return { y: 0, x: -40 };
      default: return { y: 40, x: 0 };
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    const { x, y } = getTransform();

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        x,
        opacity: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, direction, duration, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
