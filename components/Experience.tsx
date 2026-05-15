'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  const experiences = [
    {
      title: 'Computer Vision Intern',
      company: 'CloverBridge Technologies Pvt. Limited',
      location: 'Remote',
      period: '2026 – Present',
      badge: 'Active',
      description: [
        'Conducting applied research on real-time object detection for hospital surveillance using YOLO-family architectures (YOLOv8/v9) on live camera feeds',
        'Studied and benchmarked transformer-based detectors — DETR and RT-DETR — analyzing attention mechanisms, encoder-decoder design, and inference speed for clinical-grade deployment',
        'Developed patient-monitoring pipeline to detect critical events (falls, restricted-zone entry) from multi-camera hospital footage using custom-trained YOLO models',
        'Integrated live RTSP camera streams for real-time hospital feed ingestion; applied OSNet, InsightFace, and TransReID for person re-identification and appearance embedding extraction across multiple camera viewpoints',
        'Designed and evaluated a GRU-based sequence model to validate temporal consistency of person embeddings, improving identity-tracking accuracy across long-duration hospital camera footage',
      ],
      technologies: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'DETR', 'RT-DETR', 'OSNet', 'InsightFace', 'TransReID', 'GRU', 'RTSP', 'Re-ID'],
    },
    {
      title: 'AI Intern',
      company: 'DigiSignals',
      location: 'Remote',
      period: '2025',
      badge: null,
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
            {/* Glowing vertical line */}
            <div
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5"
              style={{
                top: 0, bottom: 0,
                background: 'linear-gradient(180deg, transparent 0%, var(--color-primary) 10%, var(--color-accent) 50%, var(--color-primary) 90%, transparent 100%)',
                boxShadow: '0 0 10px rgba(0,255,65,0.25), 0 0 4px rgba(0,229,255,0.15)',
              }}
            />

            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.65, delay: index * 0.25 }}
                  className={`relative md:flex md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Gradient timeline dot — centred vertically on the card */}
                  <motion.div
                    className="hidden md:block absolute z-10"
                    style={{
                      width: 22, height: 22,
                      left: '50%', top: '50%',
                      marginLeft: -11, marginTop: -11,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                      border: '3px solid var(--bg-card-solid)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 6px rgba(0,255,65,0.4), 0 0 2px rgba(0,229,255,0.2)',
                        '0 0 18px rgba(0,255,65,0.75), 0 0 8px rgba(0,229,255,0.45)',
                        '0 0 6px rgba(0,255,65,0.4), 0 0 2px rgba(0,229,255,0.2)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />

                  {/* Content Card */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-14' : 'md:pl-14'}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="rounded-2xl backdrop-blur-sm transition-all duration-300 group relative overflow-hidden"
                      style={{
                        border: '1px solid var(--border-primary)',
                        borderLeft: '3px solid var(--color-primary)',
                        backgroundColor: 'var(--bg-card)',
                        boxShadow: 'var(--shadow-card)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(0,255,65,0.45)';
                        el.style.borderLeftColor = 'var(--color-accent)';
                        el.style.boxShadow = '0 10px 40px rgba(0,255,65,0.1)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'var(--border-primary)';
                        el.style.borderLeftColor = 'var(--color-primary)';
                        el.style.boxShadow = 'var(--shadow-card)';
                      }}
                    >
                      {/* Top gradient strip */}
                      <div style={{
                        height: 2,
                        background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                        opacity: 0.55,
                      }} />

                      <div className="p-6">
                        {/* Badges row */}
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: 'rgba(0,255,65,0.1)',
                                border: '1px solid rgba(0,255,65,0.3)',
                                color: 'var(--color-primary)',
                              }}
                            >
                              <FaCalendar style={{ fontSize: '0.6rem' }} />
                              {exp.period}
                            </span>
                            {exp.badge && (
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold"
                                style={{
                                  backgroundColor: 'rgba(0,255,65,0.15)',
                                  border: '1px solid rgba(0,255,65,0.4)',
                                  color: 'var(--color-primary)',
                                }}
                              >
                                <motion.span
                                  style={{
                                    display: 'inline-block', width: 5, height: 5,
                                    borderRadius: '50%', backgroundColor: 'var(--color-primary)',
                                  }}
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 1.4, repeat: Infinity }}
                                />
                                {exp.badge}
                              </span>
                            )}
                          </div>
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: 'rgba(0,229,255,0.08)',
                              border: '1px solid rgba(0,229,255,0.22)',
                              color: 'var(--color-accent)',
                            }}
                          >
                            <FaMapMarkerAlt style={{ fontSize: '0.6rem' }} />
                            {exp.location}
                          </span>
                        </div>

                        {/* Title & company */}
                        <div className="mb-4">
                          <h3
                            className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300"
                            style={{ color: 'var(--text-heading)' }}
                          >
                            {exp.title}
                          </h3>
                          <p className="text-base flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                            <FaBriefcase style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }} />
                            {exp.company}
                          </p>
                        </div>

                        {/* Bullet points */}
                        <ul className="space-y-2.5 mb-5">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                              <span style={{ color: 'var(--color-primary)', marginTop: 4, flexShrink: 0, fontSize: '0.65rem' }}>▹</span>
                              <span style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium rounded-full"
                              style={{
                                backgroundColor: 'rgba(0,255,65,0.07)',
                                color: 'var(--color-primary)',
                                border: '1px solid rgba(0,255,65,0.22)',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
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
