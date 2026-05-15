'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaMusic, FaBrain } from 'react-icons/fa';

// Slow, stately rise — like names appearing in movie end credits
const creditsEase = [0.16, 1, 0.3, 1] as const;

function CreditLine({
  children,
  delay,
  isInView,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay: number;
  isInView: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 90 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 90 }}
      transition={{ duration: 1.05, delay, ease: creditsEase }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

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

        {/* Section title — dramatic credit reveal */}
        <CreditLine delay={0} isInView={isInView} className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-heading)' }}
          >
            <span className="text-primary">{'<'}</span>
            About Me
            <span className="text-primary">{' />'}</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </CreditLine>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content — each paragraph rises like a credit */}
          <div className="space-y-6">
            {[
              <>
                I&apos;m a{' '}
                <span className="text-primary font-semibold">4th-year AI Engineering student</span> at{' '}
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
                boundaries of what&apos;s possible with AI.
              </>,
              <>
                When I&apos;m not coding, I play{' '}
                <span className="text-primary">tennis</span> and love{' '}
                <span className="text-primary">singing</span>.
              </>,
            ].map((text, i) => (
              <CreditLine
                key={i}
                delay={0.28 + i * 0.32}
                isInView={isInView}
              >
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--text-body)' }}
                >
                  {text}
                </p>
              </CreditLine>
            ))}
          </div>

          {/* Stats — rise together, slightly later */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 70 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
            transition={{ duration: 1.0, delay: 0.55, ease: creditsEase }}
          >
            {[
              { label: 'Projects Completed', value: '15+' },
              { label: 'Technologies', value: '20+' },
              { label: 'Years of Learning', value: '4+' },
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
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)')}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid — final credits wave */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <CreditLine
              key={feature.title}
              delay={0.7 + i * 0.28}
              isInView={isInView}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="p-6 rounded-xl backdrop-blur-sm transition-all duration-300 group h-full"
                style={{
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)')}
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
            </CreditLine>
          ))}
        </div>

      </div>
    </section>
  );
}
