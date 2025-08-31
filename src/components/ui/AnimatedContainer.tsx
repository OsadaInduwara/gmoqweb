'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface AnimatedContainerProps extends HTMLAttributes<HTMLDivElement> {
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'rotateIn' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  children: React.ReactNode;
}

const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ 
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    children, 
    className,
    ...props 
  }, ref) => {
    const { ref: intersectionRef, isVisible } = useIntersectionObserver({
      threshold,
      freezeOnceVisible: true
    });

    const animations = {
      fadeInUp: {
        initial: 'opacity-0 translate-y-8',
        animate: 'opacity-100 translate-y-0'
      },
      fadeInDown: {
        initial: 'opacity-0 -translate-y-8',
        animate: 'opacity-100 translate-y-0'
      },
      fadeInLeft: {
        initial: 'opacity-0 -translate-x-8',
        animate: 'opacity-100 translate-x-0'
      },
      fadeInRight: {
        initial: 'opacity-0 translate-x-8',
        animate: 'opacity-100 translate-x-0'
      },
      scaleIn: {
        initial: 'opacity-0 scale-90',
        animate: 'opacity-100 scale-100'
      },
      rotateIn: {
        initial: 'opacity-0 scale-90 rotate-12',
        animate: 'opacity-100 scale-100 rotate-0'
      },
      none: {
        initial: '',
        animate: ''
      }
    };

    const selectedAnimation = animations[animation];

    // Combine refs
    const setRef = (element: HTMLDivElement | null) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(element);
        } else {
          ref.current = element;
        }
      }
      // @ts-expect-error - Intersection Observer ref assignment
      intersectionRef.current = element;
    };

    return (
      <div
        ref={setRef}
        className={cn(
          'transform transition-all ease-out',
          !isVisible && selectedAnimation.initial,
          isVisible && selectedAnimation.animate,
          className
        )}
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration * 1000}ms`
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

export { AnimatedContainer };