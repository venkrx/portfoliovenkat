'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTensorflow, SiPytorch, SiMongodb, SiPostgresql,
  SiDocker, SiGit, SiScikitlearn, SiOpencv, SiHuggingface,
} from 'react-icons/si';
import { FaLink } from 'react-icons/fa';

const aiSkills = [
  { name: 'Python', icon: SiPython, level: 92 },
  { name: 'TensorFlow', icon: SiTensorflow, level: 85 },
  { name: 'PyTorch', icon: SiPytorch, level: 82 },
  { name: 'scikit-learn', icon: SiScikitlearn, level: 84 },
  { name: 'OpenCV', icon: SiOpencv, level: 78 },
  { name: 'Hugging Face', icon: SiHuggingface, level: 80 },
  { name: 'LangChain', icon: FaLink, level: 82 },
];

const webSkills = [
  { name: 'JavaScript', icon: SiJavascript, level: 88 },
  { name: 'TypeScript', icon: SiTypescript, level: 85 },
  { name: 'React', icon: SiReact, level: 90 },
  { name: 'Next.js', icon: SiNextdotjs, level: 87 },
  { name: 'Node.js', icon: SiNodedotjs, level: 83 },
];

const toolSkills = [
  { name: 'MongoDB', icon: SiMongodb, level: 82 },
  { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
  { name: 'Docker', icon: SiDocker, level: 75 },
  { name: 'Git', icon: SiGit, level: 88 },
];

function SkillBar({
  name, icon: Icon, level, isInView, delay,
}: {
  name: string; icon: React.ElementType; level: number; isInView: boolean; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <Icon className="text-xl text-primary flex-shrink-0" />
          <span className="font-medium text-sm" style={{ color: 'var(--text-body)' }}>{name}</span>
        </div>
        <span className="text-xs font-mono text-primary">{level}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(0,255,65,0.1)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00ff41, #0ff)' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <section id="skills" className="relative py-20 md:py-32" ref={ref}>
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
            Skills &amp; Technologies
            <span className="text-primary">{' />'}</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-primary" />
        </motion.div>

        {/* AI & ML — featured full-width card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-6 md:p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden"
          style={{
            border: '1px solid rgba(0,255,65,0.45)',
            backgroundColor: 'var(--bg-card)',
            boxShadow: '0 0 32px rgba(0,255,65,0.08)',
          }}
        >
          {/* Featured badge */}
          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
            Core Focus
          </div>

          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            AI &amp; ML
          </h3>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {aiSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                {...skill}
                isInView={isInView}
                delay={0.15 + i * 0.08}
              />
            ))}
          </div>
        </motion.div>

        {/* Web Dev + Tools — 2 column row */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Web Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-6 rounded-2xl backdrop-blur-sm"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3 className="text-xl font-bold text-primary mb-6">Web Development</h3>
            <div className="space-y-5">
              {webSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  isInView={isInView}
                  delay={0.3 + i * 0.08}
                />
              ))}
            </div>
          </motion.div>

          {/* Tools & DevOps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="p-6 rounded-2xl backdrop-blur-sm"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3 className="text-xl font-bold text-primary mb-6">Tools &amp; DevOps</h3>
            <div className="space-y-5">
              {toolSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  isInView={isInView}
                  delay={0.4 + i * 0.08}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
