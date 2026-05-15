'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// Zero-lag cursor — position via useMotionValue (no spring).
// All visual state changes use CSS transitions only.
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(el).cursor === 'pointer' ||
        !!el.closest('a, button, [role="button"], [tabindex]')
      );
    };
    const onDown = (e: MouseEvent) => {
      setIsClicking(true);
      setRipples(prev => [...prev.slice(-3), { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [x, y]);

  if (isHidden) return null;

  const scale   = isClicking ? 0.58 : isPointer ? 1.45 : 1;
  const opacity = isClicking ? 0.35 : isPointer ? 0.92 : 0.68;
  const ringGlow = isPointer
    ? '0 0 18px rgba(var(--color-primary-rgb), 0.58), inset 0 0 10px rgba(var(--color-primary-rgb), 0.07)'
    : isClicking
    ? '0 0 12px rgba(var(--color-primary-rgb), 0.72)'
    : '0 0 6px rgba(var(--color-primary-rgb), 0.24)';
  const innerFill  = isPointer ? 'rgba(var(--color-primary-rgb), 0.05)' : 'transparent';
  const armW       = isPointer ? 0 : 14;
  const armH       = isPointer ? 0 : 14;
  const dotSize    = isClicking ? 8 : isPointer ? 5 : 4;
  const dotGlow    = isClicking
    ? '0 0 10px rgba(var(--color-primary-rgb), 1)'
    : '0 0 6px rgba(var(--color-primary-rgb), 0.85)';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        {/* Outer halo ring — fades in on interactive hover */}
        <div style={{
          position: 'absolute',
          width: 52, height: 52,
          left: -11, top: -11,
          borderRadius: '50%',
          border: '1px solid var(--color-primary)',
          opacity: isPointer ? 0.24 : 0,
          transform: `scale(${isPointer ? 1 : 0.7})`,
          transition: 'opacity 0.28s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: 'none',
        }} />

        {/* Main targeting ring */}
        <div style={{
          width: 30, height: 30,
          borderRadius: '50%',
          border: '1.5px solid var(--color-primary)',
          backgroundColor: innerFill,
          boxShadow: ringGlow,
          opacity,
          transform: `scale(${scale})`,
          transition: [
            'transform 0.18s cubic-bezier(0.22,1,0.36,1)',
            'opacity 0.18s ease',
            'box-shadow 0.2s ease',
            'background-color 0.2s ease',
          ].join(', '),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Horizontal crosshair arm */}
          <div style={{
            position: 'absolute',
            width: armW,
            height: 1,
            backgroundColor: 'rgba(var(--color-primary-rgb), 0.55)',
            transition: 'width 0.14s ease',
          }} />
          {/* Vertical crosshair arm */}
          <div style={{
            position: 'absolute',
            height: armH,
            width: 1,
            backgroundColor: 'rgba(var(--color-primary-rgb), 0.55)',
            transition: 'height 0.14s ease',
          }} />
          {/* Center precision dot */}
          <div style={{
            position: 'absolute',
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            boxShadow: dotGlow,
            transition: 'width 0.12s ease, height 0.12s ease, box-shadow 0.15s ease',
          }} />
        </div>
      </motion.div>

      {/* Click ripple */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: r.x, y: r.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ scale: 0.25, opacity: 0.72 }}
          animate={{ scale: 4.5, opacity: 0 }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        >
          <div style={{
            width: 30, height: 30,
            borderRadius: '50%',
            border: '1px solid rgba(var(--color-primary-rgb), 0.5)',
          }} />
        </motion.div>
      ))}
    </>
  );
}
