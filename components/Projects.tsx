'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  description: string;
  github_url: string;
  demo_url?: string;
  language: string;
  topics: string[];
  isOrg?: boolean;
}

const personalProjects: Project[] = [
  {
    id: 1,
    name: 'Legal AI Backend',
    description: 'AI-powered legal document analysis system — processes, understands, and extracts insights from complex legal texts using NLP pipelines and LLM reasoning.',
    github_url: 'https://github.com/venkatramks/legal_ai_backend',
    language: 'Python',
    topics: ['ai', 'legal-tech', 'nlp', 'backend'],
  },
  {
    id: 2,
    name: 'Legal AI Frontend',
    description: 'Modern React interface for AI-powered legal document analysis — clean UX for uploading, querying, and exploring legal document insights.',
    github_url: 'https://github.com/venkatramks/legal_ai_frontend',
    language: 'TypeScript',
    topics: ['react', 'typescript', 'legal-tech', 'ai'],
  },
  {
    id: 3,
    name: 'Smart Food Monitor',
    description: 'IoT-enabled smart refrigerator system for real-time food tracking and freshness monitoring using computer vision and sensor data.',
    github_url: 'https://github.com/venkatramks/Smart-System-for-Food-Monitoring',
    language: 'Jupyter Notebook',
    topics: ['iot', 'food-monitoring', 'computer-vision', 'arduino'],
  },
  {
    id: 4,
    name: 'RAG Pipeline',
    description: 'Advanced RAG implementation — semantic chunking, dense retrieval with pgvector, and LLM-powered generation for accurate knowledge-grounded responses.',
    github_url: 'https://github.com/venkatramks/Retrieval-Augmented-Generation',
    language: 'Python',
    topics: ['rag', 'llm', 'ai', 'nlp', 'pgvector'],
  },
  {
    id: 5,
    name: 'Genetic Mutation AI',
    description: 'AI-driven framework to prioritize genetic mutations by their potential disease phenotype impact — bridging bioinformatics and machine learning.',
    github_url: 'https://github.com/venkatramks/AI-Based-Approach-for-Prioritization-of-Genetic-Mutations',
    language: 'Jupyter Notebook',
    topics: ['bioinformatics', 'machine-learning', 'genetics', 'healthcare'],
  },
  {
    id: 6,
    name: 'Portfolio Website',
    description: 'This portfolio — built with Next.js, TypeScript, Framer Motion, and TailwindCSS featuring laptop project cards, custom cursor, and theme switcher.',
    github_url: 'https://github.com/venkatramks',
    language: 'TypeScript',
    topics: ['nextjs', 'framer-motion', 'tailwindcss', 'portfolio'],
  },
];

const orgProjects: Project[] = [
  {
    id: 101,
    name: 'Deep Learning',
    description: 'Deep neural network implementations — CNNs, RNNs, Transformers, and end-to-end training pipelines for computer vision and NLP tasks.',
    github_url: 'https://github.com/Vetri-Namathey/Deep-Learning',
    language: 'Jupyter Notebook',
    topics: ['deep-learning', 'cnn', 'transformer', 'pytorch'],
    isOrg: true,
  },
  {
    id: 102,
    name: 'Bayesian AI · Perovskite',
    description: 'Bayesian AI system predicting properties of perovskite materials for clean-energy applications — combining probabilistic modeling with materials science.',
    github_url: 'https://github.com/Vetri-Namathey/Bayesian-AI-System-for-Perovskite-Material-Prediction',
    language: 'Python',
    topics: ['bayesian-ml', 'materials-science', 'ai', 'prediction'],
    isOrg: true,
  },
  {
    id: 103,
    name: 'Big Data Time Series',
    description: 'Large-scale time series analysis — trend detection, forecasting, and anomaly detection on high-volume streaming data using distributed computing.',
    github_url: 'https://github.com/Vetri-Namathey/Big-Data-Analytics-Time-Series-Analysis',
    language: 'Jupyter Notebook',
    topics: ['big-data', 'time-series', 'forecasting', 'anomaly-detection'],
    isOrg: true,
  },
  {
    id: 104,
    name: 'Probabilistic Reasoning',
    description: 'Bayesian networks, probabilistic graphical models, and inference for reasoning under uncertainty in intelligent AI systems.',
    github_url: 'https://github.com/Vetri-Namathey/Probabilistic-Reasoning',
    language: 'Python',
    topics: ['bayesian-networks', 'pgm', 'inference', 'ai'],
    isOrg: true,
  },
  {
    id: 105,
    name: 'Database Mgmt System',
    description: 'Full-stack DBMS implementation — relational algebra, query optimization, indexing structures, and transaction management.',
    github_url: 'https://github.com/Vetri-Namathey/Database-Management-System',
    language: 'TypeScript',
    topics: ['dbms', 'sql', 'query-optimization', 'indexing'],
    isOrg: true,
  },
  {
    id: 106,
    name: 'Computer Security',
    description: 'Cryptographic protocols, network security algorithms, and secure system implementations — encryption, hashing, and vulnerability analysis.',
    github_url: 'https://github.com/Vetri-Namathey/Computer-Security',
    language: 'Python',
    topics: ['cryptography', 'network-security', 'encryption', 'hashing'],
    isOrg: true,
  },
  {
    id: 107,
    name: 'Formal Lang & Automata',
    description: 'Formal language theory — finite automata, pushdown automata, Turing machines, and grammar parsing algorithms.',
    github_url: 'https://github.com/Vetri-Namathey/Formal-Language-and-Automata',
    language: 'JavaScript',
    topics: ['automata', 'formal-languages', 'turing-machine', 'theory'],
    isOrg: true,
  },
];

// Language → title-bar color + label color
const LANG_META: Record<string, { bar: string; label: string }> = {
  'Python':           { bar: '#3776ab', label: '#ffe873' },
  'TypeScript':       { bar: '#3178c6', label: '#ffffff' },
  'JavaScript':       { bar: '#a87e00', label: '#ffffff' },
  'Jupyter Notebook': { bar: '#e87535', label: '#ffffff' },
};

// Deterministic code-line widths (as %) from project id
function codeLines(seed: number): number[] {
  return [52, 38, 65, 28, 46, 60].map((base, i) =>
    base + ((seed * (i + 1) * 13) % 24)
  );
}

// Screen position as % of the viewBox "0 0 300 210"
// Screen rect in SVG: x=10 y=10 w=280 h=168
const SCREEN_POS: React.CSSProperties = {
  position: 'absolute',
  top:    '4.762%',   // 10/210
  left:   '3.333%',  // 10/300
  width:  '93.333%', // 280/300
  height: '80%',     // 168/210
  overflow: 'hidden',
  borderRadius: 3,
};

// ── Laptop chrome SVG (purely decorative, no screen content) ──────────────────
function LaptopChrome() {
  return (
    <svg
      viewBox="0 0 300 210"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {/* ── LID ── */}
      {/* Outer body */}
      <rect x="2" y="1" width="296" height="178" rx="8" fill="#1c2128" />
      <rect x="2" y="1" width="296" height="178" rx="8"
        fill="none" stroke="#373e47" strokeWidth="1.5" />
      {/* Subtle top-edge highlight */}
      <rect x="3" y="2" width="294" height="2" rx="1" fill="rgba(255,255,255,0.07)" />
      {/* Screen backing (HTML content will sit on top) */}
      <rect x="10" y="10" width="280" height="168" rx="2" fill="#090d13" />
      <rect x="10" y="10" width="280" height="168" rx="2"
        fill="none" stroke="#1a2030" strokeWidth="1" />
      {/* Camera */}
      <circle cx="150" cy="5.5" r="2" fill="#21262d" />
      <circle cx="150" cy="5.5" r="0.8" fill="#090d13" />
      {/* Hinge groove */}
      <rect x="2" y="177" width="296" height="4" rx="1" fill="#0d1117" />

      {/* ── BASE ── */}
      <path d="M 0,181 L 300,181 L 312,208 L -12,208 Z" fill="#161b22" />
      <path d="M 0,181 L 300,181 L 312,208 L -12,208 Z"
        fill="none" stroke="#373e47" strokeWidth="1" />
      <line x1="0" y1="181" x2="300" y2="181"
        stroke="rgba(255,255,255,0.055)" strokeWidth="1" />

      {/* ── KEYBOARD ── */}
      {/* Number row */}
      {Array.from({ length: 14 }, (_, k) => (
        <rect key={`r0-${k}`}
          x={4 + k * 20.7} y={184}
          width="18.5" height="4" rx="0.8"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      ))}
      {/* QWERTY row */}
      {Array.from({ length: 13 }, (_, k) => (
        <rect key={`r1-${k}`}
          x={7 + k * 22} y={190}
          width="20" height="4" rx="0.8"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      ))}
      {/* ASDF row */}
      {Array.from({ length: 12 }, (_, k) => (
        <rect key={`r2-${k}`}
          x={13 + k * 22} y={196}
          width="20" height="4" rx="0.8"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      ))}
      {/* Spacebar */}
      <rect x="82" y="202" width="136" height="3.5" rx="1"
        fill="rgba(255,255,255,0.075)" />
    </svg>
  );
}

// ── Card screen: mini code preview ────────────────────────────────────────────
function CardScreen({ project }: { project: Project }) {
  const meta = LANG_META[project.language] ?? { bar: '#00ff41', label: '#000' };
  const lines = codeLines(project.id);
  const title = project.name.length > 16 ? project.name.slice(0, 16) + '…' : project.name;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#090d13' }}>
      {/* Window title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '3px 6px', backgroundColor: meta.bar, flexShrink: 0,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'rgba(255,95,86,0.85)', flexShrink: 0 }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'rgba(255,189,46,0.85)', flexShrink: 0 }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'rgba(39,201,63,0.85)', flexShrink: 0 }} />
        <span style={{ fontSize: 6, fontFamily: 'ui-monospace,monospace', fontWeight: 600, color: meta.label, marginLeft: 3 }}>
          {title}
        </span>
      </div>
      {/* Simulated code lines */}
      <div style={{ flex: 1, padding: '5px 7px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        {lines.map((w, i) => (
          <div key={i} style={{
            height: 3,
            width: `${w}%`,
            borderRadius: 2,
            flexShrink: 0,
            backgroundColor:
              i === 1 || i === 4 ? meta.bar + '55' :
              i === 3             ? 'rgba(0,255,65,0.3)' :
                                    'rgba(255,255,255,0.1)',
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Modal screen: real project details inside the laptop ──────────────────────
function ModalScreen({ project, onClose }: { project: Project; onClose: () => void }) {
  const meta = LANG_META[project.language] ?? { bar: '#00ff41', label: '#000' };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d1117' }}>
      {/* macOS-style window title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '7px 12px', backgroundColor: meta.bar, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          {/* Red dot = close */}
          <button
            onClick={onClose}
            title="Close"
            style={{
              width: 12, height: 12, borderRadius: '50%',
              backgroundColor: '#ff5f56', border: 'none',
              flexShrink: 0, display: 'block',
            }}
          />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e', flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c940', flexShrink: 0 }} />
          <span style={{
            fontSize: 12, fontFamily: 'ui-monospace,monospace', fontWeight: 600,
            color: meta.label, marginLeft: 6,
          }}>
            {project.name}
          </span>
        </div>
        <span style={{ fontSize: 10, color: meta.label, opacity: 0.75, fontFamily: 'ui-monospace,monospace' }}>
          {project.language}
        </span>
      </div>

      {/* Scrollable project details */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
        {project.isOrg && (
          <div style={{ marginBottom: 10 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100,
              backgroundColor: 'rgba(0,255,65,0.12)', color: '#00ff41',
              border: '1px solid rgba(0,255,65,0.28)',
            }}>
              ORG · Vetri-Namathey
            </span>
          </div>
        )}

        <h3 style={{ color: '#f0f6fc', fontSize: 18, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
          {project.name}
        </h3>

        <p style={{ color: '#c9d1d9', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {project.topics.map(t => (
            <span key={t} style={{
              fontSize: 10, padding: '3px 9px', borderRadius: 100,
              backgroundColor: 'rgba(0,255,65,0.08)', color: '#00ff41',
              border: '1px solid rgba(0,255,65,0.2)',
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '9px 18px', borderRadius: 7,
              backgroundColor: '#00ff41', color: '#000',
              fontSize: 12, fontWeight: 700, textDecoration: 'none',
            }}
          >
            <FaGithub size={13} /> View on GitHub
          </a>
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 7,
                border: '1px solid rgba(0,255,65,0.4)', color: '#00ff41',
                fontSize: 12, fontWeight: 700, textDecoration: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <FaExternalLinkAlt size={11} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Laptop card (grid) ────────────────────────────────────────────────────────
function LaptopCard({
  project, onClick, delay, isInView,
}: {
  project: Project; onClick: () => void; delay: number; isInView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2.5 cursor-none group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100, damping: 15 }}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ width: 170, filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.55))' }}
      >
        {/* Aspect-ratio container locks the proportions so % positioning works */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '300 / 210' }}>
          <LaptopChrome />
          <div style={SCREEN_POS}>
            <CardScreen project={project} />
          </div>
          {project.isOrg && (
            <div style={{
              position: 'absolute', top: -4, right: -4, zIndex: 10,
              fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 100,
              backgroundColor: '#00ff41', color: '#000',
              boxShadow: '0 0 7px rgba(0,255,65,0.55)', lineHeight: 1.4,
            }}>
              ORG
            </div>
          )}
        </div>
      </motion.div>

      <p
        className="text-center text-[11px] font-semibold leading-snug group-hover:text-primary transition-colors duration-200"
        style={{ color: 'var(--text-muted)', maxWidth: 160 }}
      >
        {project.name}
      </p>
    </motion.div>
  );
}

// ── Project modal — zooms in as a laptop with details on screen ───────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      key="modal-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.87)', backdropFilter: 'blur(18px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.78, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 290, damping: 26 }}
        style={{
          width: 'min(580px, 92vw)',
          filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(0,255,65,0.06))',
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '300 / 210' }}>
          <LaptopChrome />
          <div style={SCREEN_POS}>
            <ModalScreen project={project} onClose={onClose} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.06 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section id="projects" ref={ref} className="relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--grid-color) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>
              <span className="text-primary">{'<'}</span>
              Featured Projects
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Click any laptop to read the project details
            </p>
          </motion.div>

          {/* Personal projects */}
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xs font-semibold tracking-widest uppercase mb-10 text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Personal Projects
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 justify-items-center">
              {personalProjects.map((p, i) => (
                <LaptopCard
                  key={p.id}
                  project={p}
                  onClick={() => setSelectedProject(p)}
                  delay={i * 0.07}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="h-px mx-auto mb-16 origin-center"
            style={{
              maxWidth: 480,
              background: 'linear-gradient(90deg, transparent, var(--border-primary), transparent)',
            }}
          />

          {/* Org projects */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xs font-semibold tracking-widest uppercase mb-10 text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Vetri-Namathey · Organisation
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 justify-items-center">
              {orgProjects.map((p, i) => (
                <LaptopCard
                  key={p.id}
                  project={p}
                  onClick={() => setSelectedProject(p)}
                  delay={0.45 + i * 0.07}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
