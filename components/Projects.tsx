'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaRobot, FaCode } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  description: string;
  github_url: string;
  demo_url?: string;
  language: string;
  topics: string[];
  isOrg?: boolean;
  shelf: 'ai' | 'other';
}

const allProjects: Project[] = [
  {
    id: 1,
    name: 'Legal AI Backend',
    description: 'AI-powered legal document analysis system — processes, understands, and extracts insights from complex legal texts using NLP pipelines and LLM reasoning.',
    github_url: 'https://github.com/venkatramks/legal_ai_backend',
    language: 'Python',
    topics: ['ai', 'legal-tech', 'nlp', 'backend'],
    shelf: 'ai',
  },
  {
    id: 4,
    name: 'RAG Pipeline',
    description: 'Advanced RAG implementation — semantic chunking, dense retrieval with pgvector, and LLM-powered generation for accurate knowledge-grounded responses.',
    github_url: 'https://github.com/venkatramks/Retrieval-Augmented-Generation',
    language: 'Python',
    topics: ['rag', 'llm', 'ai', 'nlp', 'pgvector'],
    shelf: 'ai',
  },
  {
    id: 5,
    name: 'Genetic Mutation AI',
    description: 'AI-driven framework to prioritize genetic mutations by their potential disease phenotype impact — bridging bioinformatics and machine learning.',
    github_url: 'https://github.com/venkatramks/AI-Based-Approach-for-Prioritization-of-Genetic-Mutations',
    language: 'Jupyter Notebook',
    topics: ['bioinformatics', 'machine-learning', 'genetics', 'healthcare'],
    shelf: 'ai',
  },
  {
    id: 101,
    name: 'Deep Learning',
    description: 'Deep neural network implementations — CNNs, RNNs, Transformers, and end-to-end training pipelines for computer vision and NLP tasks.',
    github_url: 'https://github.com/Vetri-Namathey/Deep-Learning',
    language: 'Jupyter Notebook',
    topics: ['deep-learning', 'cnn', 'transformer', 'pytorch'],
    isOrg: true,
    shelf: 'ai',
  },
  {
    id: 102,
    name: 'Bayesian AI · Perovskite',
    description: 'Bayesian AI system predicting properties of perovskite materials for clean-energy applications — combining probabilistic modeling with materials science.',
    github_url: 'https://github.com/Vetri-Namathey/Bayesian-AI-System-for-Perovskite-Material-Prediction',
    language: 'Python',
    topics: ['bayesian-ml', 'materials-science', 'ai', 'prediction'],
    isOrg: true,
    shelf: 'ai',
  },
  {
    id: 103,
    name: 'Big Data Time Series',
    description: 'Large-scale time series analysis — trend detection, forecasting, and anomaly detection on high-volume streaming data using distributed computing.',
    github_url: 'https://github.com/Vetri-Namathey/Big-Data-Analytics-Time-Series-Analysis',
    language: 'Jupyter Notebook',
    topics: ['big-data', 'time-series', 'forecasting', 'anomaly-detection'],
    isOrg: true,
    shelf: 'ai',
  },
  {
    id: 104,
    name: 'Probabilistic Reasoning',
    description: 'Bayesian networks, probabilistic graphical models, and inference for reasoning under uncertainty in intelligent AI systems.',
    github_url: 'https://github.com/Vetri-Namathey/Probabilistic-Reasoning',
    language: 'Python',
    topics: ['bayesian-networks', 'pgm', 'inference', 'ai'],
    isOrg: true,
    shelf: 'ai',
  },
  {
    id: 2,
    name: 'Legal AI Frontend',
    description: 'Modern React interface for AI-powered legal document analysis — clean UX for uploading, querying, and exploring legal document insights.',
    github_url: 'https://github.com/venkatramks/legal_ai_frontend',
    language: 'TypeScript',
    topics: ['react', 'typescript', 'legal-tech', 'ai'],
    shelf: 'other',
  },
  {
    id: 3,
    name: 'Smart Food Monitor',
    description: 'IoT-enabled smart refrigerator system for real-time food tracking and freshness monitoring using computer vision and sensor data.',
    github_url: 'https://github.com/venkatramks/Smart-System-for-Food-Monitoring',
    language: 'Jupyter Notebook',
    topics: ['iot', 'food-monitoring', 'computer-vision', 'arduino'],
    shelf: 'other',
  },
  {
    id: 6,
    name: 'Portfolio Website',
    description: 'This portfolio — built with Next.js, TypeScript, Framer Motion, and TailwindCSS featuring laptop desk cards, custom cursor, and smooth animations.',
    github_url: 'https://github.com/venkatramks',
    language: 'TypeScript',
    topics: ['nextjs', 'framer-motion', 'tailwindcss', 'portfolio'],
    shelf: 'other',
  },
  {
    id: 105,
    name: 'Database Mgmt System',
    description: 'Full-stack DBMS implementation — relational algebra, query optimization, indexing structures, and transaction management.',
    github_url: 'https://github.com/Vetri-Namathey/Database-Management-System',
    language: 'TypeScript',
    topics: ['dbms', 'sql', 'query-optimization', 'indexing'],
    isOrg: true,
    shelf: 'other',
  },
  {
    id: 106,
    name: 'Computer Security',
    description: 'Cryptographic protocols, network security algorithms, and secure system implementations — encryption, hashing, and vulnerability analysis.',
    github_url: 'https://github.com/Vetri-Namathey/Computer-Security',
    language: 'Python',
    topics: ['cryptography', 'network-security', 'encryption', 'hashing'],
    isOrg: true,
    shelf: 'other',
  },
  {
    id: 107,
    name: 'Formal Lang & Automata',
    description: 'Formal language theory — finite automata, pushdown automata, Turing machines, and grammar parsing algorithms.',
    github_url: 'https://github.com/Vetri-Namathey/Formal-Language-and-Automata',
    language: 'JavaScript',
    topics: ['automata', 'formal-languages', 'turing-machine', 'theory'],
    isOrg: true,
    shelf: 'other',
  },
];

const LANG_META: Record<string, { bar: string; label: string; bg: string }> = {
  'Python':           { bar: '#3776ab', label: '#ffe873', bg: 'rgba(55,118,171,0.14)'  },
  'TypeScript':       { bar: '#3178c6', label: '#ffffff', bg: 'rgba(49,120,198,0.14)'  },
  'JavaScript':       { bar: '#a87e00', label: '#ffffff', bg: 'rgba(168,126,0,0.14)'   },
  'Jupyter Notebook': { bar: '#e87535', label: '#ffffff', bg: 'rgba(232,117,53,0.14)'  },
};

function codeLines(seed: number): number[] {
  return [52, 38, 65, 28, 46, 60].map((base, i) =>
    base + ((seed * (i + 1) * 13) % 24)
  );
}

const SCREEN_POS: React.CSSProperties = {
  position: 'absolute',
  top:    '5.505%',
  left:   '4.375%',
  width:  '91.25%',
  height: '68.807%',
  overflow: 'hidden',
  borderRadius: 3,
};

// ── Laptop SVG chrome ─────────────────────────────────────────────────────────
function LaptopChrome() {
  return (
    <svg
      viewBox="0 0 320 218"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <rect x="1" y="1" width="318" height="170" rx="4" fill="#18253d" />
      <rect x="1" y="1" width="318" height="170" rx="4" fill="none" stroke="#2e4264" strokeWidth="1.5" />
      <rect x="2" y="2" width="316" height="2" rx="1" fill="rgba(255,255,255,0.07)" />
      <line x1="1.5" y1="5" x2="1.5" y2="167" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="318.5" y1="5" x2="318.5" y2="167" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <rect x="1" y="1" width="318" height="55" rx="4" fill="rgba(255,255,255,0.025)" />
      <rect x="14" y="12" width="292" height="150" rx="3" fill="#060c15" />
      <rect x="14" y="12" width="292" height="150" rx="3" fill="none" stroke="#1a2840" strokeWidth="0.8" />
      <circle cx="160" cy="7" r="3" fill="#131d2d" stroke="#2a3f5a" strokeWidth="0.8" />
      <circle cx="160" cy="7" r="1.2" fill="#070d18" />
      <circle cx="160.7" cy="6.3" r="0.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="153" cy="7" r="0.6" fill="#1a2840" />
      <circle cx="167" cy="7" r="0.6" fill="#1a2840" />
      <rect x="0" y="170" width="320" height="3" rx="0" fill="#0c1828" />
      <line x1="0" y1="170" x2="320" y2="170" stroke="rgba(0,229,255,0.1)" strokeWidth="0.7" />
      <path d="M 6,173 L 314,173 L 326,215 L -6,215 Z" fill="#0f1e30" />
      <path d="M 6,173 L 314,173 L 326,215 L -6,215 Z" fill="none" stroke="#243548" strokeWidth="0.8" />
      <line x1="6" y1="173" x2="314" y2="173" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" />
      <circle cx="308" cy="175.5" r="2" fill="#00ff41" opacity="0.65" />
      {Array.from({ length: 14 }, (_, k) => (
        <rect key={`k0-${k}`} x={8 + k * 21.7} y={176} width="19.5" height="3.5" rx="0.8"
          fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      ))}
      {Array.from({ length: 13 }, (_, k) => (
        <rect key={`k1-${k}`} x={10 + k * 23} y={181.5} width="21" height="4.5" rx="0.8"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
      ))}
      {Array.from({ length: 12 }, (_, k) => (
        <rect key={`k2-${k}`} x={18 + k * 23} y={188} width="21" height="4.5" rx="0.8"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
      ))}
      {Array.from({ length: 11 }, (_, k) => (
        <rect key={`k3-${k}`} x={24 + k * 24.5} y={194.5} width="21" height="4.5" rx="0.8"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
      ))}
      <rect x="90" y="201" width="140" height="4" rx="1.2" fill="rgba(255,255,255,0.07)" />
      <rect x="116" y="207" width="88" height="6.5" rx="1.5"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
    </svg>
  );
}

// ── Laptop screen preview ─────────────────────────────────────────────────────
function CardScreen({ project }: { project: Project }) {
  const meta = LANG_META[project.language] ?? { bar: '#1a2840', label: '#ffffff', bg: '' };
  const lines = codeLines(project.id);
  const title = project.name.length > 22 ? project.name.slice(0, 22) + '…' : project.name;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#06101e' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '3px 4px 3px 7px', backgroundColor: meta.bar, flexShrink: 0,
      }}>
        <span style={{
          fontSize: 6, fontFamily: 'ui-monospace,monospace', fontWeight: 600,
          color: meta.label, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 1 }}>
          <div style={{ width: 9, height: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 5, height: 0.8, backgroundColor: meta.label, opacity: 0.75 }} />
          </div>
          <div style={{
            width: 8, height: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 6.5, color: meta.label, opacity: 0.8, fontWeight: 700, lineHeight: 1,
          }}>×</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '5px 7px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        {lines.map((w, i) => (
          <div key={i} style={{
            height: 3, width: `${w}%`, borderRadius: 2, flexShrink: 0,
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

// ── Laptop card (on-desk preview) ─────────────────────────────────────────────
function LaptopCard({
  project, onClick, delay, isInView,
}: {
  project: Project; onClick: () => void; delay: number; isInView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-none group flex-shrink-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.45, delay, type: 'spring', stiffness: 120, damping: 16 }}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ width: 155, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))' }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '320 / 218' }}>
          <LaptopChrome />
          <div style={SCREEN_POS}>
            <CardScreen project={project} />
          </div>
          {project.isOrg && (
            <div style={{
              position: 'absolute', top: -4, right: -4, zIndex: 10,
              fontSize: 7, fontWeight: 700, padding: '2px 5px', borderRadius: 100,
              backgroundColor: '#00ff41', color: '#000',
              boxShadow: '0 0 6px rgba(0,255,65,0.55)', lineHeight: 1.4,
            }}>ORG</div>
          )}
        </div>
      </motion.div>
      <p
        className="text-center text-[10px] font-semibold leading-snug group-hover:text-primary transition-colors duration-200"
        style={{ color: 'var(--text-muted)', maxWidth: 145 }}
      >
        {project.name}
      </p>
    </motion.div>
  );
}

// ── OS-style window rendered inside the laptop screen ────────────────────────
function ModalScreen({
  project, onClose, onMaximize, isMaximized,
}: {
  project: Project; onClose: () => void; onMaximize: () => void; isMaximized: boolean;
}) {
  const meta = LANG_META[project.language] ?? { bar: '#1a2840', label: '#ffffff', bg: '' };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#07111e' }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: meta.bar, flexShrink: 0, height: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, minWidth: 0 }}>
          <span style={{
            fontSize: 12, fontFamily: 'ui-monospace,monospace', fontWeight: 600,
            color: meta.label, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{project.name}</span>
          <span style={{ fontSize: 10, color: `${meta.label}88`, fontFamily: 'ui-monospace,monospace', flexShrink: 0 }}>
            [{project.language}]
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch', height: '100%', flexShrink: 0 }}>
          {/* Minimize — decorative */}
          <div style={{
            width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: `${meta.label}99`, fontFamily: 'monospace', userSelect: 'none',
          }}>─</div>
          {/* Maximize — functional */}
          <button
            onClick={onMaximize}
            title={isMaximized ? 'Restore' : 'Maximize'}
            style={{
              width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isMaximized ? 12 : 11, color: meta.label, fontFamily: 'monospace',
              border: 'none', backgroundColor: 'transparent',
              transition: 'background-color 0.12s', cursor: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            {isMaximized ? '⊡' : '□'}
          </button>
          {/* Close — turns red on hover */}
          <button
            onClick={onClose}
            style={{
              width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, color: meta.label, fontFamily: 'monospace', fontWeight: 700,
              border: 'none', backgroundColor: 'transparent',
              transition: 'background-color 0.12s', cursor: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#e81123'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >✕</button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
        {project.isOrg && (
          <div style={{ marginBottom: 10 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100,
              backgroundColor: 'rgba(0,255,65,0.12)', color: '#00ff41',
              border: '1px solid rgba(0,255,65,0.28)',
            }}>ORG · Vetri-Namathey</span>
          </div>
        )}
        <h3 style={{ color: '#e8f4ff', fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
          {project.name}
        </h3>
        <p style={{ color: '#a8c0d8', fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {project.topics.map(t => (
            <span key={t} style={{
              fontSize: 9, padding: '2px 8px', borderRadius: 100,
              backgroundColor: 'rgba(0,255,65,0.08)', color: '#00ff41',
              border: '1px solid rgba(0,255,65,0.2)',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href={project.github_url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 6,
              backgroundColor: '#00ff41', color: '#000',
              fontSize: 11, fontWeight: 700, textDecoration: 'none',
            }}>
            <FaGithub size={11} /> GitHub
          </a>
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 6,
                border: '1px solid rgba(0,255,65,0.4)', color: '#00ff41',
                fontSize: 11, fontWeight: 700, textDecoration: 'none',
                backgroundColor: 'transparent',
              }}>
              <FaExternalLinkAlt size={10} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Laptop-shaped modal — opens when you click a laptop ───────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [isMaximized, setIsMaximized] = useState(false);

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
      style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(18px)' }}
      onClick={e => { if (e.target === e.currentTarget && !isMaximized) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.78, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 290, damping: 26 }}
        style={{
          width: isMaximized ? 'min(860px, 96vw)' : 'min(580px, 92vw)',
          transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1)',
          filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(0,255,65,0.07))',
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '320 / 218' }}>
          <LaptopChrome />
          <div style={SCREEN_POS}>
            <ModalScreen
              project={project}
              onClose={onClose}
              onMaximize={() => setIsMaximized(m => !m)}
              isMaximized={isMaximized}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── PC desk housing (laptops sit on top of a desk surface) ────────────────────
function DeskSection({
  title, Icon, accentHex, projects, isInView, onSelect, baseDelay,
}: {
  title: string;
  Icon: React.ElementType;
  accentHex: string;
  projects: Project[];
  isInView: boolean;
  onSelect: (p: Project) => void;
  baseDelay: number;
}) {
  return (
    <div className="mb-16">

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: baseDelay }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 14px', borderRadius: 100,
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          backgroundColor: `${accentHex}18`,
          border: `1px solid ${accentHex}45`,
          color: accentHex,
          fontFamily: 'ui-monospace, monospace',
        }}>
          <Icon style={{ fontSize: '0.72rem' }} />
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accentHex}38, transparent)` }} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'ui-monospace, monospace' }}>
          {projects.length} projects
        </span>
      </motion.div>

      {/* Desk housing */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: baseDelay + 0.12 }}
        style={{
          position: 'relative', borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${accentHex}28`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Back panel: dark gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 38,
          background: 'linear-gradient(160deg, rgba(8,18,36,0.7) 0%, rgba(4,10,22,0.92) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Back panel: dot grid */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 38,
          backgroundImage: 'radial-gradient(circle, var(--grid-color) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          opacity: 0.6,
          pointerEvents: 'none',
        }} />

        {/* Left accent pillar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 38, width: 4,
          background: `linear-gradient(180deg, ${accentHex}70, transparent)`,
          borderRadius: '16px 0 0 0',
        }} />
        {/* Right accent pillar */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 38, width: 4,
          background: `linear-gradient(180deg, ${accentHex}70, transparent)`,
          borderRadius: '0 16px 0 0',
        }} />

        {/* Laptops row — horizontally scrollable */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: 18,
          overflowX: 'auto',
          paddingTop: 28, paddingLeft: 20, paddingRight: 20, paddingBottom: 6,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'],
        }}>
          {projects.map((p, i) => (
            <LaptopCard
              key={p.id}
              project={p}
              onClick={() => onSelect(p)}
              delay={baseDelay + 0.1 + i * 0.06}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Desk surface */}
        <div style={{
          position: 'relative', zIndex: 1, height: 38,
          background: 'linear-gradient(180deg, #1a2a42 0%, #0d1b2e 55%, #060f1e 100%)',
          borderTop: `1px solid ${accentHex}1a`,
        }}>
          {/* Edge highlight sheen */}
          <div style={{
            position: 'absolute', top: 0, left: '4%', right: '4%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          }} />
          {/* LED glow strip */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
            background: `linear-gradient(90deg, transparent, ${accentHex}55, transparent)`,
            filter: `blur(1px)`,
          }} />
          {/* Desk leg hints */}
          <div style={{
            position: 'absolute', bottom: 0, left: 30, width: 5, height: '72%',
            background: 'rgba(255,255,255,0.05)', borderRadius: '0 0 3px 3px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 30, width: 5, height: '72%',
            background: 'rgba(255,255,255,0.05)', borderRadius: '0 0 3px 3px',
          }} />
        </div>
      </motion.div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.04 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const aiProjects    = allProjects.filter(p => p.shelf === 'ai');
  const otherProjects = allProjects.filter(p => p.shelf === 'other');

  return (
    <section id="projects" ref={ref} className="relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Dot grid */}
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
            className="mb-16"
          >
            <p style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.72rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 12,
            }}>// 03 — projects</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>
              What I&apos;ve Built<span className="text-primary">.</span>
            </h2>
            <div className="h-px mt-5" style={{
              background: 'linear-gradient(90deg, var(--color-primary), transparent)',
              maxWidth: 200,
            }} />
            <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              Click any laptop to see full project details
            </p>
          </motion.div>

          <DeskSection
            title="AI & Machine Learning"
            Icon={FaRobot}
            accentHex="#00ff41"
            projects={aiProjects}
            isInView={isInView}
            onSelect={setSelectedProject}
            baseDelay={0.1}
          />

          <DeskSection
            title="Web, Tools & CS"
            Icon={FaCode}
            accentHex="#00e5ff"
            projects={otherProjects}
            isInView={isInView}
            onSelect={setSelectedProject}
            baseDelay={0.2}
          />

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
