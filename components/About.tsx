'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaMusic, FaBrain } from 'react-icons/fa';

// Stately rise — used for every "credit" line
function Rise({
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
      className={className}
      style={style}
      initial={{ opacity: 0, y: 72 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: FaBrain,
    title: 'AI & Machine Learning',
    description: 'Deep learning, LLMs, agentic frameworks — building systems that think.',
  },
  {
    icon: FaCode,
    title: 'Full-Stack Development',
    description: 'React, Next.js, Node.js — scalable apps from idea to production.',
  },
  {
    icon: FaMusic,
    title: 'Beyond the Screen',
    description: 'Tennis player & singer — creativity and competition sharpen my engineering.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.08 });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-36 overflow-hidden">

      {/* Subtle dot grid — terminal industry backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--grid-color) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Label ── credit 1 */}
        <Rise delay={0} isInView={isInView} className="mb-4">
          <p style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
          }}>
            // 01 — about
          </p>
        </Rise>

        {/* ── Section title ── credit 2 */}
        <Rise delay={0.22} isInView={isInView} className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>
            About Me<span className="text-primary">.</span>
          </h2>
          <div className="h-px mt-5" style={{ background: 'linear-gradient(90deg, var(--color-primary), transparent)', maxWidth: 200 }} />
        </Rise>

        {/* ── Two-column: text + stats ── */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">

          {/* Text column — each paragraph is its own credit */}
          <div className="space-y-7">
            {[
              <>I&apos;m a <span className="text-primary font-semibold">4th-year AI Engineering student</span> at <span className="text-accent font-semibold">Amrita Vishwa Vidyapeetham, Coimbatore</span> — driven by a curiosity for intelligent systems and a hunger to build things that actually matter.</>,
              <>I don&apos;t just use LLMs — I <span className="text-primary font-semibold">build systems that use them</span>. Agentic pipelines that reason, plan, and act. RAG architectures that surface meaning. Vision models that understand the world. <span className="text-accent">LLMs are the engine; I build the vehicle.</span></>,
              <>That same thinking carries into <span className="text-primary">full-stack development</span> — every layer from model inference to production UI has to be intentional. Whether it&apos;s a React interface or a distributed ML pipeline, I care about the craft end to end.</>,
              <>Off the keyboard: <span className="text-primary">tennis</span> keeps me sharp and <span className="text-primary">singing</span> keeps me human.</>,
            ].map((text, i) => (
              <Rise key={i} delay={0.44 + i * 0.26} isInView={isInView}>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{
                    color: 'var(--text-body)',
                    borderLeft: '2px solid var(--border-primary)',
                    paddingLeft: '1rem',
                  }}
                >
                  {text}
                </p>
              </Rise>
            ))}
          </div>

          {/* Stats — terminal industry style, each a credit */}
          <div className="flex flex-col justify-center gap-8">
            {[
              { value: '15+', label: 'Projects Completed', sub: 'personal + org' },
              { value: '20+', label: 'Technologies',        sub: 'across the stack' },
              { value: '4',   label: 'Years of Learning',   sub: 'and counting' },
            ].map((stat, i) => (
              <Rise key={stat.label} delay={0.55 + i * 0.22} isInView={isInView}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '18px 22px',
                  borderRadius: 12,
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                }}>
                  <span style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '2.4rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: 72,
                  }}>{stat.value}</span>
                  <div>
                    <p style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.95rem' }}>{stat.label}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', marginTop: 2 }}>{stat.sub}</p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>

        {/* ── Divider ── credit N */}
        <Rise delay={1.25} isInView={isInView} className="mb-14">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-primary)' }} />
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              what drives me
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-primary)' }} />
          </div>
        </Rise>

        {/* ── Feature cards — final credits wave ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Rise key={feature.title} delay={1.42 + i * 0.22} isInView={isInView}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group h-full"
                style={{
                  padding: '24px',
                  borderRadius: 14,
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  transition: 'border-color 0.25s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)')}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 inline-block text-primary text-3xl">
                  <feature.icon />
                </div>
                <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </motion.div>
            </Rise>
          ))}
        </div>

      </div>
    </section>
  );
}
