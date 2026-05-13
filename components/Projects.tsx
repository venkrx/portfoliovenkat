'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  description: string;
  github_url: string;
  demo_url?: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Legal AI Backend',
    description: 'AI-powered legal document analysis system with intelligent processing capabilities',
    github_url: 'https://github.com/venkatramks/legal_ai_backend',
    demo_url: '',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['ai', 'legal-tech', 'nlp', 'backend'],
  },
  {
    id: 2,
    name: 'Legal AI Frontend',
    description: 'Modern frontend interface for AI-powered legal document analysis',
    github_url: 'https://github.com/venkatramks/legal_ai_frontend',
    demo_url: '',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    topics: ['react', 'typescript', 'legal-tech', 'ai'],
  },
  {
    id: 3,
    name: 'Smart Food Monitoring System',
    description: 'IoT-enabled Smart Refrigerator for real-time food tracking and freshness monitoring',
    github_url: 'https://github.com/venkatramks/Smart-System-for-Food-Monitoring',
    demo_url: '',
    language: 'Jupyter Notebook',
    stars: 1,
    forks: 0,
    topics: ['iot', 'food-monitoring', 'smart-home', 'arduino'],
  },
  {
    id: 4,
    name: 'Retrieval Augmented Generation',
    description: 'Advanced RAG implementation for enhanced AI-powered information retrieval',
    github_url: 'https://github.com/venkatramks/Retrieval-Augmented-Generation',
    demo_url: '',
    language: 'Python',
    stars: 1,
    forks: 0,
    topics: ['rag', 'llm', 'ai', 'nlp'],
  },
  {
    id: 5,
    name: 'AI Genetic Mutation Prioritization',
    description: 'AI-driven framework to prioritize genetic mutations based on their potential impact on disease phenotypes',
    github_url: 'https://github.com/venkatramks/AI-Based-Approach-for-Prioritization-of-Genetic-Mutations',
    demo_url: '',
    language: 'Jupyter Notebook',
    stars: 1,
    forks: 0,
    topics: ['bioinformatics', 'machine-learning', 'genetics', 'healthcare'],
  },
  {
    id: 6,
    name: 'Portfolio Website',
    description: 'Modern portfolio with flashy UI, circuit animations, and Terminal Industries-inspired design',
    github_url: 'https://github.com/venkatramks',
    demo_url: '',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    topics: ['nextjs', 'react', 'framer-motion', 'tailwindcss', 'portfolio'],
  },
];

const accentColors = ['#00ff41', '#0ff', '#a855f7', '#ec4899', '#00ff41', '#0ff'];
const accentGlows = [
  'rgba(0,255,65,0.12)', 'rgba(0,255,255,0.12)', 'rgba(168,85,247,0.12)',
  'rgba(236,72,153,0.12)', 'rgba(0,255,65,0.12)', 'rgba(0,255,255,0.12)',
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <section id="projects" className="relative py-20 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-heading)' }}
            >
              <span className="text-primary">{'<'}</span>
              Featured Projects
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-7">
            {projects.map((project, index) => {
              const accent = accentColors[index % accentColors.length];
              const glow = accentGlows[index % accentGlows.length];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300"
                  style={{
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-card)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = accent;
                    el.style.boxShadow = `0 12px 40px ${glow}`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border-primary)';
                    el.style.boxShadow = 'var(--shadow-card)';
                  }}
                >
                  {/* Gradient hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top right, ${glow} 0%, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    {/* Top accent bar */}
                    <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: accent }} />

                    <h3
                      className="text-xl font-bold mb-2 transition-colors duration-300"
                      style={{ color: 'var(--text-heading)' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = accent)}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-heading)')}
                    >
                      {project.name}
                    </h3>

                    <p className="mb-4 leading-relaxed min-h-[48px] text-sm" style={{ color: 'var(--text-muted)' }}>
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                        <FaStar className="text-yellow-500" size={12} />
                        <span className="text-xs">{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                        <FaCodeBranch className="text-primary" size={12} />
                        <span className="text-xs">{project.forks}</span>
                      </div>
                      {project.language && (
                        <span className="text-xs font-medium text-accent">{project.language}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.topics.slice(0, 5).map(topic => (
                        <span
                          key={topic}
                          className="px-2.5 py-0.5 text-xs rounded-full font-medium"
                          style={{
                            backgroundColor: `${accent}12`,
                            color: accent,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-primary"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <FaGithub className="text-lg" />
                        Code
                      </motion.a>
                      {project.demo_url && (
                        <motion.a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-primary"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <FaExternalLinkAlt className="text-base" />
                          Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
