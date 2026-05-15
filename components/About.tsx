'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaEye, FaBrain } from 'react-icons/fa';

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
    icon: FaEye,
    number: '01',
    title: 'Computer Vision',
    description: 'Training models that see — object detection, segmentation, visual grounding. Understanding the world through pixels is where I invest most of my research.',
    color: 'var(--color-accent)',
    rgb: '0, 229, 255',
  },
  {
    icon: FaBrain,
    number: '02',
    title: 'AI Agents & LLMs',
    description: "I build the systems that use LLMs — not the other way around. Agentic pipelines, multi-step reasoning, RAG architectures that act on knowledge.",
    color: 'var(--color-primary)',
    rgb: '0, 255, 65',
  },
  {
    icon: FaCode,
    number: '03',
    title: 'Full-Stack Craft',
    description: 'React, Next.js, FastAPI, Node.js — shipping the whole product end to end. Every layer from inference to production UI has to be intentional.',
    color: 'var(--color-primary)',
    rgb: '0, 255, 65',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.08 });

  const aboutParas: React.ReactNode[] = [
    <>I&apos;m a <span className="text-primary font-semibold">4th-year AI Engineering student</span> at <span className="text-accent font-semibold">Amrita Vishwa Vidyapeetham, Coimbatore</span> — driven by a curiosity for intelligent systems and a hunger to build things that actually matter.</>,
    <>I don&apos;t just use LLMs — I <span className="text-primary font-semibold">build systems that use them</span>. Agentic pipelines that reason, plan, and act. RAG architectures that surface meaning. Vision models that understand the world. <span className="text-accent">LLMs are the engine; I build the vehicle.</span></>,
    <>That same thinking carries into <span className="text-primary">full-stack development</span> — every layer from model inference to production UI has to be intentional. Whether it&apos;s a React interface or a distributed ML pipeline, I care about the craft end to end.</>,
    <>Off the keyboard: <span className="text-primary">tennis</span> keeps me sharp and <span className="text-primary">singing</span> keeps me human.</>,
  ];
  const creditItems = [...aboutParas, ...aboutParas];

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <style>{`
        @keyframes about-credits {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .about-credits-track {
          animation: about-credits 28s linear infinite;
          will-change: transform;
        }
        .about-credits-outer:hover .about-credits-track {
          animation-play-state: paused;
        }
      `}</style>

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

          {/* Text column — vertical credits marquee */}
          <Rise delay={0.44} isInView={isInView}>
            <div
              className="about-credits-outer"
              style={{
                height: 300,
                overflow: 'hidden',
                position: 'relative',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              }}
            >
              <div className="about-credits-track" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {creditItems.map((text, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg leading-relaxed"
                    style={{
                      color: 'var(--text-body)',
                      borderLeft: '2px solid var(--border-primary)',
                      paddingLeft: '1rem',
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </Rise>

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
                whileHover={{ y: -5 }}
                className="h-full"
                style={{
                  padding: '22px 22px 22px 20px',
                  borderRadius: 14,
                  backgroundColor: 'var(--bg-card)',
                  borderTop: '1px solid var(--border-primary)',
                  borderRight: '1px solid var(--border-primary)',
                  borderBottom: '1px solid var(--border-primary)',
                  borderLeft: `3px solid rgba(${feature.rgb}, 0.65)`,
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderTopColor = `rgba(${feature.rgb}, 0.25)`;
                  el.style.borderRightColor = `rgba(${feature.rgb}, 0.25)`;
                  el.style.borderBottomColor = `rgba(${feature.rgb}, 0.25)`;
                  el.style.boxShadow = `0 8px 28px rgba(${feature.rgb}, 0.1)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderTopColor = 'var(--border-primary)';
                  el.style.borderRightColor = 'var(--border-primary)';
                  el.style.borderBottomColor = 'var(--border-primary)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Number + icon row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem',
                    fontWeight: 700, letterSpacing: '0.12em',
                    color: `rgba(${feature.rgb}, 0.5)`,
                  }}>{feature.number}</span>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: `rgba(${feature.rgb}, 0.08)`,
                    border: `1px solid rgba(${feature.rgb}, 0.2)`,
                  }}>
                    <feature.icon style={{ color: feature.color, fontSize: '1.1rem' }} />
                  </div>
                </div>

                <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: 9 }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>
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
