'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import CircuitBackground from './CircuitBackground';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// Letter component to avoid hooks inside loops
function GlowLetter({ letter, index, totalLetters, progress }: any) {
  const letterProgress = index / totalLetters;
  const opacity = useTransform(
    progress,
    [letterProgress - 0.1, letterProgress, letterProgress + 0.1],
    [0, 1, 0]
  );

  return (
    <motion.span
      style={{
        display: 'inline-block',
        color: useTransform(opacity, (val) => {
          const v = val as number;
          return v > 0.5 ? '#00ff41' : '#ffffff';
        }),
        textShadow: useTransform(opacity, (val) => {
          const v = val as number;
          return `0 0 ${v * 40}px rgba(0, 255, 65, ${v * 0.8}), 0 0 ${v * 20}px rgba(0, 255, 65, ${v * 0.6})`;
        }),
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  
  const progressValue = useMotionValue(0);
  const smoothProgress = useSpring(progressValue, { stiffness: 50, damping: 20 });

  // Name glows from 0-0.5, content fades 0.5-1
  const nameGlowProgress = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.5, 1], [0, 1]);

  const name = "K S Venkatram";
  const nameLetters = name.split('');

  useEffect(() => {
    let accumulatedScroll = 0;
    const scrollThreshold = 1500; // Total scroll needed to complete animations

    const updateProgress = (scrollAmount: number) => {
      accumulatedScroll = Math.max(0, Math.min(scrollAmount, scrollThreshold));
      const progress = accumulatedScroll / scrollThreshold;
      progressValue.set(progress);
      setAnimationProgress(progress);
      
      // Mark complete when reached end
      if (progress >= 0.99) {
        setAnimationsComplete(true);
      }
      
      // Reset completion if scrolling back
      if (progress < 0.95 && animationsComplete) {
        setAnimationsComplete(false);
      }
    };

    // Handle wheel events (for precise control)
    const handleWheel = (e: WheelEvent) => {
      const shouldInterceptScroll = !animationsComplete || (animationsComplete && e.deltaY < 0 && window.scrollY === 0);
      
      if (shouldInterceptScroll) {
        e.preventDefault();
        accumulatedScroll += e.deltaY;
        updateProgress(accumulatedScroll);
      }
    };

    // Handle regular scroll events (for auto-scroll and touch devices)
    const handleScroll = () => {
      if (!animationsComplete) {
        // Map page scroll position to animation progress
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight * 0.5; // Half viewport height triggers full animation
        const scrollProgress = Math.min(scrollY / maxScroll, 1) * scrollThreshold;
        updateProgress(scrollProgress);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationsComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CircuitBackground />

      <div className="h-screen flex items-center justify-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="relative"
              style={{ opacity: contentOpacity }}
            >
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Glowing border rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: '0 0 30px rgba(0,255,65,0.5)'
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                  <img
                    src="/my pic.jpg"
                    alt="K S Venkatram"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Corner accents */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 left-1/2 w-8 h-8"
                    style={{
                      transformOrigin: '50% 128px',
                      rotate: rotation
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <div className="text-center md:text-left flex-1">
        
              {/* Greeting */}
              <motion.div variants={itemVariants} className="mb-4">
                <span className="text-primary text-lg md:text-xl font-mono">
                  {'> Hello World, I am'}
                </span>
              </motion.div>

              {/* Name with scroll-controlled letter-by-letter glow */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 whitespace-nowrap"
              >
          {nameLetters.map((letter, index) => (
            <GlowLetter
              key={index}
              letter={letter}
              index={index}
              totalLetters={nameLetters.length}
              progress={nameGlowProgress}
            />
                ))}
              </motion.h1>

              {/* Tagline - fades in with scroll after name glows */}
              <motion.div 
                variants={itemVariants} 
                className="mb-8"
                style={{ opacity: contentOpacity }}
              >
                <h2 className="text-3xl md:text-4xl font-light">
                  <span className="text-white">AI Engineer</span>{' '}
                  <span className="text-accent">& Tech Enthusiast</span>
                </h2>
              </motion.div>

              {/* Description - fades in with scroll after name glows */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl max-w-3xl mb-12 leading-relaxed text-gray-300"
                style={{ opacity: contentOpacity }}
              >
                <span>3rd Year AI Engineering Student at </span>
                <span className="text-accent">Amrita Vishwa Vidyapeetham, Coimbatore</span>
                <br />
                <span>Passionate about Artificial Intelligence, Machine Learning, and cutting-edge technology</span>
              </motion.p>

              {/* CTA Buttons - fade in with scroll */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 justify-center md:justify-start mb-12"
                style={{ opacity: contentOpacity }}
              >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 glow-box"
          >
            View My Work
          </motion.a>
          <motion.a
            href="/venkat.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300"
          >
            View Resume
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social Links - fade in with scroll */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 justify-center md:justify-start"
            style={{ opacity: contentOpacity }}
          >
          {[
            { Icon: FaGithub, href: 'https://github.com/venkatramks', label: 'GitHub', external: true },
            { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/venkatram-krishnapuram/', label: 'LinkedIn', external: true },
            { Icon: FaEnvelope, href: 'mailto:venkatram.ks@gmail.com', label: 'Email', external: false },
          ].map(({ Icon, href, label, external }) => (
            <motion.a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-3xl text-gray-400 hover:text-primary transition-colors duration-300"
              aria-label={label}
            >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    </section>
  );
}
