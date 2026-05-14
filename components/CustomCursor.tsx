'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// Targeting-scope cursor — zero position lag (useMotionValue, no spring).
// All visual state changes (size, glow, crosshair) use CSS transitions only.
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Direct motion values — no spring, follows mouse exactly
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

  // All transitions via CSS — no Framer spring on anything visual
  const scale   = isClicking ? 0.62 : isPointer ? 1.55 : 1;
  const opacity = isClicking ? 0.4  : isPointer ? 0.88 : 0.62;
  const glow    = isPointer
    ? '0 0 14px rgba(0,255,65,0.52), inset 0 0 8px rgba(0,255,65,0.07)'
    : isClicking
    ? '0 0 8px rgba(0,255,65,0.65)'
    : '0 0 5px rgba(0,255,65,0.2)';
  const innerFill = isPointer ? 'rgba(0,255,65,0.05)' : 'transparent';

  // Crosshair arms retract when hovering interactive elements (ring expands like a lens)
  const armW = isPointer ? 0 : 15;
  const armH = isPointer ? 0 : 15;
  const dotW = isClicking ? 7 : 4;

  return (
    <>
      {/* Single cursor element — position is exact, visuals use CSS transition */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '1.5px solid #00ff41',
            backgroundColor: innerFill,
            boxShadow: glow,
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
          }}
        >
          {/* Horizontal crosshair arm */}
          <div style={{
            position: 'absolute',
            width: armW,
            height: 1,
            backgroundColor: 'rgba(0,255,65,0.55)',
            transition: 'width 0.14s ease',
          }} />
          {/* Vertical crosshair arm */}
          <div style={{
            position: 'absolute',
            height: armH,
            width: 1,
            backgroundColor: 'rgba(0,255,65,0.55)',
            transition: 'height 0.14s ease',
          }} />
          {/* Center precision dot */}
          <div style={{
            position: 'absolute',
            width: dotW,
            height: dotW,
            borderRadius: '50%',
            backgroundColor: '#00ff41',
            boxShadow: '0 0 6px rgba(0,255,65,0.85)',
            transition: 'width 0.12s ease, height 0.12s ease',
          }} />
        </div>
      </motion.div>

      {/* Click ripple — starts from exact mouse position */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: r.x, y: r.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ scale: 0.25, opacity: 0.75 }}
          animate={{ scale: 4.5, opacity: 0 }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        >
          <div style={{
            width: 30, height: 30,
            borderRadius: '50%',
            border: '1px solid rgba(0,255,65,0.5)',
          }} />
        </motion.div>
      ))}
    </>
  );
}
