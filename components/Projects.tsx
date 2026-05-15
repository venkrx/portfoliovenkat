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
    description: 'This portfolio — built with Next.js, TypeScript, Framer Motion, and TailwindCSS featuring 3D project cards, custom cursor, and smooth scroll animations.',
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

const LANG_META: Record<string, { color: string; bg: string; label: string }> = {
  'Python':           { color: '#3776ab', bg: 'rgba(55,118,171,0.12)',  label: '#79b8ff' },
  'TypeScript':       { color: '#3178c6', bg: 'rgba(49,120,198,0.12)',  label: '#79b8ff' },
  'JavaScript':       { color: '#a87e00', bg: 'rgba(168,126,0,0.12)',   label: '#e3c35a' },
  'Jupyter Notebook': { color: '#e87535', bg: 'rgba(232,117,53,0.12)', label: '#f0a975' },
};

function TiltCard({
  project, onClick, delay, isInView,
}: {
  project: Project; onClick: () => void; delay: number; isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const meta = LANG_META[project.language] ?? { color: '#666', bg: 'rgba(128,128,128,0.1)', label: '#aaa' };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(16px)`;
    el.style.boxShadow = `0 20px 48px rgba(0,0,0,0.35), 0 0 32px ${meta.color}25`;
    el.style.borderColor = `${meta.color}80`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    el.style.boxShadow = 'var(--shadow-card)';
    el.style.borderColor = 'var(--border-primary)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          padding: '22px 20px 18px',
          borderRadius: 14,
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          boxShadow: 'var(--shadow-card)',
          cursor: 'none',
          transition: 'transform 0.12s ease, box-shadow 0.28s ease, border-color 0.28s ease',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Language color top strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          backgroundColor: meta.color,
          borderRadius: '14px 14px 0 0',
        }} />

        {/* Header: badges + GitHub link */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginBottom: 14, flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100,
            backgroundColor: meta.bg, color: meta.label,
            border: `1px solid ${meta.color}40`,
            fontFamily: 'ui-monospace, monospace',
          }}>{project.language}</span>
          {project.isOrg && (
            <span style={{
              fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100,
              backgroundColor: 'rgba(0,255,65,0.08)', color: 'var(--color-primary)',
              border: '1px solid rgba(0,255,65,0.25)',
              fontFamily: 'ui-monospace, monospace',
            }}>ORG</span>
          )}
          <div style={{ flex: 1 }} />
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
          >
            <FaGithub />
          </a>
        </div>

        {/* Project name */}
        <h3 style={{
          color: 'var(--text-heading)', fontWeight: 700, fontSize: '0.96rem',
          marginBottom: 9, lineHeight: 1.35,
        }}>
          {project.name}
        </h3>

        {/* Description — 3-line clamp via Tailwind */}
        <p
          className="line-clamp-3"
          style={{
            color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.7,
            flex: 1, marginBottom: 16,
          }}
        >
          {project.description}
        </p>

        {/* Topic chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.topics.slice(0, 4).map(t => (
            <span key={t} style={{
              fontSize: '0.6rem', padding: '2px 8px', borderRadius: 100,
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-primary)',
              fontFamily: 'ui-monospace, monospace',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const meta = LANG_META[project.language] ?? { color: '#666', bg: 'rgba(128,128,128,0.1)', label: '#aaa' };

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
      style={{ backgroundColor: 'rgba(0,0,0,0.86)', backdropFilter: 'blur(18px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          width: 'min(560px, 92vw)',
          borderRadius: 18,
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          boxShadow: `0 36px 80px rgba(0,0,0,0.6), 0 0 50px ${meta.color}18`,
        }}
      >
        {/* Language color strip */}
        <div style={{ height: 4, backgroundColor: meta.color }} />

        {/* Modal header */}
        <div style={{
          padding: '20px 24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            {project.isOrg && (
              <span style={{
                display: 'inline-block', marginBottom: 10,
                fontSize: '0.65rem', fontWeight: 700, padding: '2px 9px', borderRadius: 100,
                backgroundColor: 'rgba(0,255,65,0.08)', color: 'var(--color-primary)',
                border: '1px solid rgba(0,255,65,0.25)',
                fontFamily: 'ui-monospace, monospace',
              }}>ORG · Vetri-Namathey</span>
            )}
            <h3 style={{
              color: 'var(--text-heading)', fontSize: '1.25rem',
              fontWeight: 700, lineHeight: 1.3,
            }}>
              {project.name}
            </h3>
          </div>

          {/* Close button — turns red on hover */}
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border-primary)',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'none',
              fontSize: '0.88rem',
              transition: 'background-color 0.18s, color 0.18s, border-color 0.18s',
              marginTop: 2,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'rgba(232,17,35,0.12)';
              el.style.color = '#e81123';
              el.style.borderColor = 'rgba(232,17,35,0.45)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'transparent';
              el.style.color = 'var(--text-muted)';
              el.style.borderColor = 'var(--border-primary)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '16px 24px 26px', overflowY: 'auto', maxHeight: '62vh' }}>
          {/* Language badge */}
          <span style={{
            display: 'inline-block', marginBottom: 16,
            fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100,
            backgroundColor: meta.bg, color: meta.label,
            border: `1px solid ${meta.color}40`,
            fontFamily: 'ui-monospace, monospace',
          }}>{project.language}</span>

          <p style={{
            color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.78,
            marginBottom: 20,
          }}>
            {project.description}
          </p>

          {/* Topics */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 26 }}>
            {project.topics.map(t => (
              <span key={t} style={{
                fontSize: '0.7rem', padding: '3px 10px', borderRadius: 100,
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.06)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(var(--color-primary-rgb), 0.2)',
                fontFamily: 'ui-monospace, monospace',
              }}>{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={project.github_url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 9,
                backgroundColor: 'var(--color-primary)', color: '#000',
                fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none',
              }}
            >
              <FaGithub size={14} /> View on GitHub
            </a>
            {project.demo_url && (
              <a
                href={project.demo_url} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 9,
                  border: '1px solid rgba(var(--color-primary-rgb), 0.4)',
                  color: 'var(--color-primary)',
                  fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none',
                  backgroundColor: 'transparent',
                }}
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionBlock({
  title, Icon, accentColor, projects, isInView, onSelect, baseDelay,
}: {
  title: string;
  Icon: React.ElementType;
  accentColor: string;
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
          backgroundColor: `${accentColor}14`,
          border: `1px solid ${accentColor}40`,
          color: accentColor,
          fontFamily: 'ui-monospace, monospace',
        }}>
          <Icon style={{ fontSize: '0.72rem' }} />
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accentColor}35, transparent)` }} />
        <span style={{
          color: 'var(--text-muted)', fontSize: '0.7rem',
          fontFamily: 'ui-monospace, monospace',
        }}>{projects.length} projects</span>
      </motion.div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {projects.map((p, i) => (
          <TiltCard
            key={p.id}
            project={p}
            onClick={() => onSelect(p)}
            delay={baseDelay + 0.08 + i * 0.07}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: 12,
            }}>// 03 — projects</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>
              What I&apos;ve Built<span className="text-primary">.</span>
            </h2>
            <div className="h-px mt-5" style={{
              background: 'linear-gradient(90deg, var(--color-primary), transparent)',
              maxWidth: 200,
            }} />
          </motion.div>

          <SectionBlock
            title="AI & Machine Learning"
            Icon={FaRobot}
            accentColor="var(--color-primary)"
            projects={aiProjects}
            isInView={isInView}
            onSelect={setSelectedProject}
            baseDelay={0.1}
          />

          <SectionBlock
            title="Web, Tools & CS"
            Icon={FaCode}
            accentColor="var(--color-accent)"
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
