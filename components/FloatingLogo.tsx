'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-calculate flame positions with rounded values to avoid hydration mismatch
const flamePositions = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30) * Math.PI / 180;
  const radius = 35;
  return {
    cx: Math.round((60 + Math.cos(angle) * radius) * 100) / 100,
    cy: Math.round((60 + Math.sin(angle) * radius) * 100) / 100,
  };
});

// Pre-calculate ember positions
const emberPositions = Array.from({ length: 15 }, (_, i) => ({
  cx: 20 + (i % 5) * 18,
  cy: 55 + Math.floor(i / 5) * 5,
  fill: i % 3 === 0 ? "#ff6a00" : i % 3 === 1 ? "#ffaa00" : "#ffff00",
  duration: 2 + (i * 0.1),
  delay: i * 0.15
}));

export default function FloatingLogo() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Move slightly with scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 pointer-events-none"
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <svg 
        width="120" 
        height="120" 
        viewBox="0 0 120 120" 
        className="overflow-visible drop-shadow-2xl"
      >
        {/* Outer red glow layer - deepest */}
        <motion.text
          x="15"
          y="60"
          fontSize="36"
          fontWeight="900"
          fill="transparent"
          stroke="#8B0000"
          strokeWidth="4"
          className="font-black"
          filter="url(#fireDeep)"
          animate={{
            strokeWidth: [4, 5, 4],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          KSV
        </motion.text>

        {/* Red-orange fire layer */}
        <motion.text
          x="15"
          y="60"
          fontSize="36"
          fontWeight="900"
          fill="transparent"
          stroke="#ff2400"
          strokeWidth="3.5"
          className="font-black"
          filter="url(#fireLogo1)"
          animate={{
            strokeWidth: [3.5, 4.5, 3.5],
            stroke: ['#ff2400', '#ff4500', '#ff2400']
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          KSV
        </motion.text>

        {/* Orange fire layer */}
        <motion.text
          x="15"
          y="60"
          fontSize="36"
          fontWeight="900"
          fill="transparent"
          stroke="#ff6a00"
          strokeWidth="2.5"
          className="font-black"
          filter="url(#fireLogo2)"
          animate={{
            strokeWidth: [2.5, 3.5, 2.5],
            stroke: ['#ff6a00', '#ff8c00', '#ff6a00']
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          KSV
        </motion.text>

        {/* Yellow-orange layer */}
        <motion.text
          x="15"
          y="60"
          fontSize="36"
          fontWeight="900"
          fill="transparent"
          stroke="#ffaa00"
          strokeWidth="1.8"
          className="font-black"
          filter="url(#fireLogo3)"
          animate={{
            strokeWidth: [1.8, 2.5, 1.8],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          KSV
        </motion.text>

        {/* Bright yellow core */}
        <motion.text
          x="15"
          y="60"
          fontSize="36"
          fontWeight="900"
          fill="transparent"
          stroke="#ffff00"
          strokeWidth="1"
          className="font-black"
          filter="url(#fireCore)"
          animate={{
            opacity: [0.7, 1, 0.7],
            strokeWidth: [1, 1.5, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          KSV
        </motion.text>

        {/* White hot center */}
        <motion.text
          x="15"
          y="60"
          fontSize="36"
          fontWeight="900"
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="0.5"
          className="font-black"
          filter="url(#fireHot)"
          animate={{
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          KSV
        </motion.text>

        {/* Flame shapes rising */}
        {flamePositions.map((pos, i) => (
          <motion.ellipse
            key={`flame-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            rx="2"
            ry="4"
            fill="url(#flameGradient)"
            filter="url(#fireLogo2)"
            animate={{
              ry: [4, 6, 4],
              cy: [pos.cy, pos.cy - 10, pos.cy],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Fire particles - embers */}
        {emberPositions.map((ember, i) => (
          <motion.circle
            key={`ember-${i}`}
            cx={ember.cx}
            cy={ember.cy}
            r="1.5"
            fill={ember.fill}
            filter="url(#fireLogo2)"
            animate={{
              cy: [ember.cy, ember.cy - 20, ember.cy - 30],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.2]
            }}
            transition={{
              duration: ember.duration,
              repeat: Infinity,
              delay: ember.delay
            }}
          />
        ))}

        {/* Glowing ring effect */}
        <motion.circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="2"
          opacity="0.3"
          filter="url(#fireLogo1)"
          animate={{
            r: [42, 45, 42],
            opacity: [0.2, 0.4, 0.2],
            strokeWidth: [2, 3, 2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gradient and Filter Definitions */}
        <defs>
          {/* Filters for different fire layers */}
          <filter id="fireDeep" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="fireLogo1" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="fireLogo2" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="fireLogo3" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="fireCore" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="fireHot" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Gradients for flame effects */}
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffff00" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff8c00" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff4500" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="ringGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ff4500" stopOpacity="0" />
            <stop offset="70%" stopColor="#ff6a00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
