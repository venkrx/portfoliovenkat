'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaMusic, FaBrain } from 'react-icons/fa';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    {
      icon: FaBrain,
      title: 'AI & Machine Learning',
      description: 'Passionate about developing intelligent systems and exploring deep learning, LLMs, and agentic frameworks.',
    },
    {
      icon: FaCode,
      title: 'Full Stack Development',
      description: 'Building scalable applications with modern frameworks — React, Next.js, Node.js, and beyond.',
    },
    {
      icon: FaMusic,
      title: 'Beyond Tech',
      description: 'Tennis player and singer — I believe creativity and athleticism sharpen engineering thinking.',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-heading)' }}
            >
              <span className="text-primary">{'<'}</span>
              About Me
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </motion.div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div className="space-y-6">
              {[
                <>
                  I'm a{' '}
                  <span className="text-primary font-semibold">3rd-year AI Engineering student</span> at{' '}
                  <span className="text-accent font-semibold">Amrita Vishwa Vidyapeetham, Coimbatore</span>,
                  driven by a passion for artificial intelligence and innovative technology solutions.
                </>,
                <>
                  My journey in tech has been fueled by curiosity and a desire to create impactful solutions.
                  I specialize in{' '}
                  <span className="text-primary">machine learning</span>,{' '}
                  <span className="text-primary">deep learning</span>,{' '}
                  <span className="text-primary">LLMs</span>, and{' '}
                  <span className="text-primary">full-stack development</span>, constantly pushing the
                  boundaries of what's possible with AI.
                </>,
                <>
                  When I'm not coding, I play{' '}
                  <span className="text-primary">tennis</span> and love{' '}
                  <span className="text-primary">singing</span>.
                </>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--text-body)' }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {[
                { label: 'Projects Completed', value: '15+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Years of Learning', value: '3+' },
              ].map(stat => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl backdrop-blur-sm transition-all duration-300"
                  style={{
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-card)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#00ff41')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)')}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-6 rounded-xl backdrop-blur-sm transition-all duration-300 group"
                style={{
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#00ff41')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)')}
              >
                <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
