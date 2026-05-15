'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBrain, FaEye, FaRobot, FaMicrochip, FaLayerGroup, FaSearch } from 'react-icons/fa';

const interests = [
  {
    icon: FaBrain,
    title: 'Large Language Models',
    description:
      'Exploring transformer architectures, RLHF, instruction fine-tuning, and building RAG systems that reason across large knowledge bases.',
    color: 'var(--color-primary)',
    glow: 'rgba(0,200,80,0.18)',
  },
  {
    icon: FaEye,
    title: 'Computer Vision',
    description:
      'Object detection, image segmentation, and visual grounding — understanding the world through pixels with deep neural networks.',
    color: 'var(--color-accent)',
    glow: 'rgba(0,180,220,0.15)',
  },
  {
    icon: FaRobot,
    title: 'Agentic AI Systems',
    description:
      'Designing autonomous agents with tool use, planning, and multi-step reasoning that act intelligently in open-ended environments.',
    color: 'var(--color-primary)',
    glow: 'rgba(0,200,80,0.18)',
  },
  {
    icon: FaSearch,
    title: 'NLP & Semantic Search',
    description:
      'Text understanding, dense embeddings, knowledge graphs, and retrieval systems that surface meaning — not just keywords.',
    color: 'var(--color-accent)',
    glow: 'rgba(0,180,220,0.15)',
  },
  {
    icon: FaLayerGroup,
    title: 'Multimodal AI',
    description:
      'Bridging vision and language — building systems that see, read, and reason jointly across images, text, and audio.',
    color: 'var(--color-accent)',
    glow: 'rgba(0,180,220,0.15)',
  },
  {
    icon: FaMicrochip,
    title: 'Edge AI & MLOps',
    description:
      'Quantization, pruning, and efficient deployment of ML models on resource-constrained devices and production pipelines.',
    color: 'var(--color-primary)',
    glow: 'rgba(0,200,80,0.18)',
  },
];

export default function Interests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <section id="interests" className="relative py-20 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Interests
            <span className="text-primary">{' />'}</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-5 rounded-full" />
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            The domains I'm most excited about and actively exploring
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-7 rounded-2xl backdrop-blur-sm overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = item.color;
                el.style.boxShadow = `0 10px 36px ${item.glow}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-primary)';
                el.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              {/* Card index */}
              <div
                className="absolute top-4 right-4 text-xs font-mono font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{ color: item.color }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Background glow blob */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
                style={{ backgroundColor: item.glow }}
              />

              {/* Icon */}
              <motion.div
                className="relative mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{
                  backgroundColor: `${item.color}15`,
                  border: `1px solid ${item.color}38`,
                }}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
                transition={{ duration: 0.4 }}
              >
                <item.icon
                  style={{ color: item.color, fontSize: '1.6rem' }}
                />
              </motion.div>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-2.5 transition-colors duration-300"
                style={{ color: 'var(--text-heading)' }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
