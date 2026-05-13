'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function CircuitBackground() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);

  const paths = [
    { d: `M 5 30 Q 20 25, 35 28 T 55 32 Q 70 35, 85 30 T 95 28`, delay: 0 },
    { d: `M 10 50 Q 25 45, 40 48 T 60 52 Q 75 55, 90 50`, delay: 0.2 },
    { d: `M 0 70 Q 15 68, 30 72 T 50 75 Q 65 78, 80 72 T 100 70`, delay: 0.4 },
    { d: `M 8 15 Q 23 12, 38 16 T 58 18 Q 73 20, 88 15`, delay: 0.6 },
  ];

  const particles = [
    { left: 20, top: 30, duration: 7, delay: 2 },
    { left: 50, top: 60, duration: 8, delay: 4 },
    { left: 75, top: 20, duration: 9, delay: 6 },
  ];

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Flowing Circuit Paths */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="ledGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, index) => (
          <g key={index}>
            <motion.path
              d={path.d}
              fill="none"
              stroke="#00ff41"
              strokeWidth="0.25"
              opacity="0.35"
              strokeLinecap="round"
              strokeDasharray="4 96"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: [0, -100, -200, -300, -400] }}
              transition={{
                duration: 9 + index * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: path.delay,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-primary rounded-full"
          style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          animate={{ y: [0, -80, 0], opacity: [0, 0.35, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}
