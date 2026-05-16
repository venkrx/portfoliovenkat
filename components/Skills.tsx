'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTensorflow, SiPytorch, SiMongodb, SiPostgresql,
  SiDocker, SiGit, SiScikitlearn, SiOpencv, SiHuggingface,
  SiTailwindcss, SiLinux,
} from 'react-icons/si';
import { FaLink } from 'react-icons/fa';

const aiSkills = [
  { name: 'Python',       icon: SiPython       },
  { name: 'TensorFlow',   icon: SiTensorflow   },
  { name: 'PyTorch',      icon: SiPytorch      },
  { name: 'scikit-learn', icon: SiScikitlearn  },
  { name: 'OpenCV',       icon: SiOpencv       },
  { name: 'Hugging Face', icon: SiHuggingface  },
  { name: 'LangChain',    icon: FaLink         },
];

const webSkills = [
  { name: 'JavaScript',   icon: SiJavascript  },
  { name: 'TypeScript',   icon: SiTypescript  },
  { name: 'React',        icon: SiReact       },
  { name: 'Next.js',      icon: SiNextdotjs   },
  { name: 'Node.js',      icon: SiNodedotjs   },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
];

const toolSkills = [
  { name: 'PostgreSQL',  icon: SiPostgresql },
  { name: 'MongoDB',     icon: SiMongodb    },
  { name: 'Docker',      icon: SiDocker     },
  { name: 'Git',         icon: SiGit        },
  { name: 'Linux',       icon: SiLinux      },
];

function SkillChip({
  name, icon: Icon, colorVar, delay, isInView, floatDelay,
}: {
  name: string;
  icon: React.ElementType;
  colorVar: 'primary' | 'accent';
  delay: number;
  isInView: boolean;
  floatDelay: number;
}) {
  const color    = `var(--color-${colorVar})`;
  const rgb      = `var(--color-${colorVar}-rgb)`;
  const bgColor  = `rgba(${rgb}, 0.05)`;
  const border   = `rgba(${rgb}, 0.16)`;
  const borderHv = `rgba(${rgb}, 0.4)`;
  const shadow   = `rgba(${rgb}, 0.12)`;

  return (
    /* Wrapper handles the float — Framer Motion on inner handles entrance */
    <div style={{
      animation: isInView
        ? `skill-float 3s ease-in-out ${floatDelay}s infinite`
        : 'none',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 14 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.82, y: 14 }}
        transition={{ duration: 0.38, delay, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${border}`,
          transition: 'border-color 0.2s, box-shadow 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = borderHv;
          el.style.boxShadow = `0 4px 18px ${shadow}`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = border;
          el.style.boxShadow = 'none';
        }}
      >
        <Icon style={{ color, fontSize: '1.18rem', flexShrink: 0 }} />
        <span style={{ color: 'var(--text-body)', fontSize: '0.9rem', fontWeight: 500 }}>
          {name}
        </span>
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.12 });

  return (
    <section id="skills" className="relative py-20 md:py-32" ref={ref}>
      <style>{`
        @keyframes skill-float {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title — terminal function-call style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.78rem', letterSpacing: '0.16em',
            color: 'var(--color-primary)', marginBottom: 10, opacity: 0.85,
          }}>{'$ stack.enumerate() ↵'}</p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-heading)' }}
          >
            Skills &amp; Technologies
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-primary" />
        </motion.div>

        {/* AI & ML — full-width featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-6 md:p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden"
          style={{
            border: '1px solid rgba(var(--color-primary-rgb), 0.4)',
            backgroundColor: 'var(--bg-card)',
            boxShadow: '0 0 36px rgba(var(--color-primary-rgb), 0.07)',
          }}
        >
          {/* Corner glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 180, height: 120,
            background: 'radial-gradient(ellipse at top left, rgba(var(--color-primary-rgb), 0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div
            className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
              border: '1px solid rgba(var(--color-primary-rgb), 0.3)',
              color: 'var(--color-primary)',
            }}
          >
            Core Focus
          </div>

          <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--color-primary)' }}>
            AI &amp; Machine Learning
          </h3>

          <div className="flex flex-wrap gap-3">
            {aiSkills.map((skill, i) => (
              <SkillChip
                key={skill.name}
                {...skill}
                colorVar="primary"
                delay={0.15 + i * 0.06}
                floatDelay={i * 0.22}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Web Dev + Tools — 2 column */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Web Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, right: 0, width: 120, height: 100,
              background: 'radial-gradient(ellipse at top right, rgba(var(--color-accent-rgb), 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--color-accent)' }}>
              Web Development
            </h3>
            <div className="flex flex-wrap gap-3">
              {webSkills.map((skill, i) => (
                <SkillChip
                  key={skill.name}
                  {...skill}
                  colorVar="accent"
                  delay={0.3 + i * 0.06}
                  floatDelay={0.5 + i * 0.25}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>

          {/* Tools & DevOps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: 120, height: 100,
              background: 'radial-gradient(ellipse at bottom left, rgba(var(--color-primary-rgb), 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--color-primary)' }}>
              Tools &amp; DevOps
            </h3>
            <div className="flex flex-wrap gap-3">
              {toolSkills.map((skill, i) => (
                <SkillChip
                  key={skill.name}
                  {...skill}
                  colorVar="primary"
                  delay={0.4 + i * 0.06}
                  floatDelay={1.1 + i * 0.28}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
