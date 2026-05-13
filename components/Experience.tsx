'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const experiences = [
    {
      title: 'AI Intern',
      company: 'DigiSignals',
      location: 'Remote',
      period: '2024',
      description: [
        'Developed an Agentic RAG Framework for Bray to improve chatbot response quality through human-in-the-loop feedback',
        'Implemented intelligent filtering system to identify and extract thumbs-down responses from chatbot interactions',
        'Built keyword extraction pipeline using NLP to analyze query-response pairs and store embeddings in PostgreSQL with pgvector',
        'Designed reasoning agent to analyze failed responses, identify improvement areas, and generate actionable insights',
        'Automated email notification system to route queries to domain experts for human feedback and continuous improvement',
        'Integrated PostgreSQL with vector similarity search for efficient retrieval and analysis of conversation patterns',
      ],
      technologies: ['Python', 'PostgreSQL', 'pgvector', 'RAG', 'LangChain', 'NLP', 'Agentic AI'],
    },
  ];

  return (
    <section id="experience" className="relative py-20 md:py-32" ref={ref}>
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
              Work Experience
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              My professional journey and contributions
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-20" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative md:flex md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"
                    style={{ border: '3px solid var(--bg-base)' }}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(0,255,65,0.4)',
                        '0 0 0 10px rgba(0,255,65,0)',
                        '0 0 0 0 rgba(0,255,65,0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Content Card */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
                      style={{
                        border: '1px solid var(--border-primary)',
                        backgroundColor: 'var(--bg-card)',
                        boxShadow: 'var(--shadow-card)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(0,255,65,0.7)';
                        el.style.boxShadow = '0 8px 32px rgba(0,255,65,0.1)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'var(--border-primary)';
                        el.style.boxShadow = 'var(--shadow-card)';
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3
                            className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary"
                            style={{ color: 'var(--text-heading)' }}
                          >
                            {exp.title}
                          </h3>
                          <p className="text-lg text-accent mt-1 flex items-center gap-2">
                            <FaBriefcase className="text-primary" />
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaCalendar className="text-primary" />
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start" style={{ color: 'var(--text-body)' }}>
                            <span className="text-primary mr-2 mt-1 flex-shrink-0">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: 'rgba(0,255,65,0.08)',
                              color: '#00ff41',
                              border: '1px solid rgba(0,255,65,0.25)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
