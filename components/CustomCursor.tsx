'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// The bracket-corner "targeting scope" cursor
// Four L-shaped corners that expand on hover, compress on click
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Corners follow with a very slight spring lag for tactile feel
  const cx = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.4 });
  const cy = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.4 });

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
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
  }, [rawX, rawY]);

  if (isHidden) return null;

  // Corner arm length and gap from center
  const arm = isClicking ? 5 : isPointer ? 9 : 7;
  const gap = isClicking ? 3 : isPointer ? 5 : 4;
  const totalHalf = arm + gap; // distance from center to corner tip
  const color = '#00ff41';
  const glow = isPointer
    ? `0 0 6px ${color}, 0 0 12px rgba(0,255,65,0.4)`
    : `0 0 4px rgba(0,255,65,0.5)`;
  const thickness = 1.5;

  const cornerStyle = (top: boolean, left: boolean): React.CSSProperties => ({
    position: 'absolute' as const,
    width: arm,
    height: arm,
    borderTop: top ? `${thickness}px solid ${color}` : 'none',
    borderBottom: !top ? `${thickness}px solid ${color}` : 'none',
    borderLeft: left ? `${thickness}px solid ${color}` : 'none',
    borderRight: !left ? `${thickness}px solid ${color}` : 'none',
    ...(top && left ? { top: -totalHalf, left: -totalHalf } : {}),
    ...(top && !left ? { top: -totalHalf, right: -totalHalf } : {}),
    ...(!top && left ? { bottom: -totalHalf, left: -totalHalf } : {}),
    ...(!top && !left ? { bottom: -totalHalf, right: -totalHalf } : {}),
    filter: `drop-shadow(${glow})`,
    transition: 'all 0.12s ease',
  });

  return (
    <>
      {/* Scope brackets */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cx,
          y: cy,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
        }}
      >
        <div style={{ position: 'relative', width: 2, height: 2 }}>
          {/* Four L-corners */}
          <div style={cornerStyle(true, true)} />
          <div style={cornerStyle(true, false)} />
          <div style={cornerStyle(false, true)} />
          <div style={cornerStyle(false, false)} />

          {/* Center dot */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: isClicking ? 2 : isPointer ? 4 : 3,
              height: isClicking ? 2 : isPointer ? 4 : 3,
              borderRadius: '50%',
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
              boxShadow: glow,
              transition: 'all 0.1s ease',
              mixBlendMode: 'normal',
            }}
          />
        </div>
      </motion.div>

      {/* Click ripples */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: r.x, y: r.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: `1px solid ${color}`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
