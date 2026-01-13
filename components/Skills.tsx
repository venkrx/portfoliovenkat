'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTensorflow,
  SiPytorch,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
} from 'react-icons/si';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Keep text color white/green throughout
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']
  );
  
  const primaryColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['rgba(0,255,65,1)', 'rgba(0,255,65,1)', 'rgba(0,255,65,1)', 'rgba(0,255,65,1)']
  );

  // Border and background colors for skill category cards - keep black theme
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['rgba(0,255,65,0.2)', 'rgba(0,255,65,0.2)', 'rgba(0,255,65,0.2)', 'rgba(0,255,65,0.2)']
  );

  const cardBackgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']
  );

  const skillCategories = [
    {
      title: 'AI & ML',
      skills: [
        { name: 'Python', icon: SiPython, level: 90 },
        { name: 'TensorFlow', icon: SiTensorflow, level: 85 },
        { name: 'PyTorch', icon: SiPytorch, level: 80 },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'JavaScript', icon: SiJavascript, level: 88 },
        { name: 'TypeScript', icon: SiTypescript, level: 85 },
        { name: 'React', icon: SiReact, level: 90 },
        { name: 'Next.js', icon: SiNextdotjs, level: 87 },
        { name: 'Node.js', icon: SiNodedotjs, level: 83 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 82 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
        { name: 'Docker', icon: SiDocker, level: 75 },
        { name: 'Git', icon: SiGit, level: 88 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 md:py-32" ref={ref}>
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
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: textColor }}
            >
              <motion.span style={{ color: primaryColor }}>{'<'}</motion.span>
              Skills & Technologies
              <motion.span style={{ color: primaryColor }}>{' />'}</motion.span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 mx-auto" 
              style={{ backgroundColor: primaryColor }}
            />
          </motion.div>

          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="p-6 border rounded-lg backdrop-blur-sm"
                style={{ 
                  borderColor: borderColor,
                  backgroundColor: cardBackgroundColor
                }}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <skill.icon className="text-2xl text-primary" />
                          <motion.span 
                            className="font-medium"
                            style={{ color: textColor }}
                          >
                            {skill.name}
                          </motion.span>
                        </div>
                        <motion.span 
                          className="text-sm"
                          style={{ color: textColor }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
