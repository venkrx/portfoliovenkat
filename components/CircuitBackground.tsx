'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function CircuitBackground() {
  const { scrollYProgress } = useScroll();
  
  // Create multiple flowing organic paths like Terminal Industries
  // These are smooth, curvy lines that flow naturally across the viewport
  const paths = [
    {
      d: `M 5 30 Q 20 25, 35 28 T 55 32 Q 70 35, 85 30 T 95 28`,
      offset: 0
    },
    {
      d: `M 10 50 Q 25 45, 40 48 T 60 52 Q 75 55, 90 50`,
      offset: 0.2
    },
    {
      d: `M 0 70 Q 15 68, 30 72 T 50 75 Q 65 78, 80 72 T 100 70`,
      offset: 0.4
    },
    {
      d: `M 8 15 Q 23 12, 38 16 T 58 18 Q 73 20, 88 15`,
      offset: 0.6
    }
  ];
  
  // LED dot progresses along all paths based on scroll
  const ledProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Static particle positions to avoid hydration mismatch
  const particles = [
    { left: 20, top: 30, duration: 7, delay: 2 },
    { left: 50, top: 60, duration: 8, delay: 4 },
    { left: 75, top: 20, duration: 9, delay: 6 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Flowing Circuit Paths - Terminal Industries Style */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="ledGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Multiple flowing paths with animated segments */}
        {paths.map((path, index) => (
          <g key={index}>
            {/* Moving line segment that animates along the path */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="#00ff41"
              strokeWidth="0.3"
              opacity="0.4"
              strokeLinecap="round"
              strokeDasharray="3 97"
              initial={{ strokeDashoffset: 0 }}
              animate={{ 
                strokeDashoffset: [0, -100, -200, -300, -400],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5
              }}
            />

            {/* Hidden path for motion reference */}
            <path
              id={`path${index}`}
              d={path.d}
              fill="none"
              stroke="none"
            />
          </g>
        ))}
      </svg>

      {/* Floating Particles - very subtle */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-primary rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
