'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Raw cursor position — dot follows this exactly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring follows with spring lag for magnetic feel
  const ringX = useSpring(dotX, { stiffness: 120, damping: 16, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 120, damping: 16, mass: 0.6 });

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      const el = e.target as HTMLElement;
      const style = window.getComputedStyle(el);
      setIsPointer(
        style.cursor === 'pointer' ||
        !!el.closest('a, button, [role="button"], [tabindex]')
      );
    };

    const onDown = (e: MouseEvent) => {
      setIsClicking(true);
      setRipples(prev => [
        ...prev.slice(-4), // keep last 4 max
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
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
  }, [dotX, dotY]);

  if (isHidden) return null;

  return (
    <>
      {/* ── Outer magnetic ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.75 : isPointer ? 1.55 : 1,
          opacity: 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 22 },
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `1.5px solid ${isPointer ? 'rgba(0,255,65,0.95)' : 'rgba(0,255,65,0.65)'}`,
            boxShadow: isPointer
              ? '0 0 18px rgba(0,255,65,0.45), inset 0 0 12px rgba(0,255,65,0.12)'
              : '0 0 8px rgba(0,255,65,0.2)',
            background: isPointer ? 'rgba(0,255,65,0.06)' : 'transparent',
            transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
          }}
        />
      </motion.div>

      {/* ── Inner precision dot (mix-blend-mode for adaptive color) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isClicking ? 0.4 : isPointer ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 28 }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
          }}
        />
      </motion.div>

      {/* ── Click ripples ── */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: r.x,
            y: r.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1.5px solid rgba(0,255,65,0.7)',
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
