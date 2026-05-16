'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

// Spring config for each comet tail ghost — progressively looser
const SPRINGS = [
  { stiffness: 500, damping: 36 }, // ghost 1 — tightest, fastest
  { stiffness: 280, damping: 30 }, // ghost 2
  { stiffness: 160, damping: 26 }, // ghost 3
  { stiffness: 90,  damping: 22 }, // ghost 4
  { stiffness: 50,  damping: 18 }, // ghost 5 — loosest, slowest
];

// Each ghost dot: size shrinks, opacity fades, blur grows toward tail end
const GHOST_STYLE = [
  { size: 9,  opacity: 0.62, blur: 0   },
  { size: 7,  opacity: 0.42, blur: 0.5 },
  { size: 5,  opacity: 0.28, blur: 1   },
  { size: 3.5, opacity: 0.16, blur: 1.5 },
  { size: 2,  opacity: 0.08, blur: 2   },
];

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden]   = useState(false);

  // Leader: raw mouse position (no lag)
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // 5 ghost followers — each springs toward the leader
  const springs = SPRINGS.map(cfg => ({
    x: useSpring(mx, cfg),
    y: useSpring(my, cfg),
  }));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      setIsPointer(
        !!el && (
          window.getComputedStyle(el).cursor === 'pointer' ||
          !!el.closest('a, button, [role="button"], [tabindex]')
        )
      );
    };
    const onDown  = () => setIsClicking(true);
    const onUp    = () => setIsClicking(false);
    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [mx, my]);

  if (isHidden) return null;

  const dotSize    = isClicking ? 6 : isPointer ? 10 : 8;
  const ringSize   = isPointer ? 34 : 0;
  const ringOpacity = isPointer ? 0.55 : 0;
  const dotGlow    = isClicking
    ? '0 0 14px rgba(var(--color-primary-rgb), 1), 0 0 28px rgba(var(--color-primary-rgb), 0.5)'
    : isPointer
    ? '0 0 10px rgba(var(--color-primary-rgb), 0.9)'
    : '0 0 6px rgba(var(--color-primary-rgb), 0.7)';

  return (
    <>
      {/* Comet tail ghosts — rendered from slowest (index 4) to fastest (index 0) */}
      {[...springs].reverse().map((sp, revIdx) => {
        const idx = SPRINGS.length - 1 - revIdx;
        const g   = GHOST_STYLE[idx];
        return (
          <motion.div
            key={idx}
            className="fixed top-0 left-0 pointer-events-none z-[9996]"
            style={{
              x: sp.x,
              y: sp.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div style={{
              width:  g.size,
              height: g.size,
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              opacity: isHidden ? 0 : g.opacity,
              filter: `blur(${g.blur}px)`,
              transition: 'opacity 0.2s ease',
            }} />
          </motion.div>
        );
      })}

      {/* Main cursor head — sits at raw mouse position */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
      >
        {/* Expand ring on interactive hover */}
        <div style={{
          position: 'absolute',
          width:  ringSize,
          height: ringSize,
          left:   -ringSize / 2,
          top:    -ringSize / 2,
          borderRadius: '50%',
          border: '1.5px solid var(--color-primary)',
          opacity: ringOpacity,
          transform: isPointer ? 'scale(1)' : 'scale(0.5)',
          transition: 'width 0.22s cubic-bezier(0.22,1,0.36,1), height 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.22s, transform 0.22s',
          boxShadow: isPointer ? '0 0 14px rgba(var(--color-primary-rgb), 0.3), inset 0 0 8px rgba(var(--color-primary-rgb), 0.06)' : 'none',
        }} />

        {/* Inner precision dot */}
        <div style={{
          width:        dotSize,
          height:       dotSize,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          boxShadow:    dotGlow,
          transform:    `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
          transition:   'width 0.12s ease, height 0.12s ease, transform 0.12s ease, box-shadow 0.15s ease',
          position:     'absolute',
          top:          '50%',
          left:         '50%',
        }} />
      </motion.div>
    </>
  );
}
