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

// Add your projects here - update this array whenever you add new projects
const projects: Project[] = [
  {
    id: 1,
    name: 'AI Chatbot Assistant',
    description: 'An intelligent chatbot powered by machine learning and natural language processing',
    github_url: 'https://github.com/venkatramks',
    demo_url: '',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['ai', 'nlp', 'chatbot', 'machine-learning'],
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'Modern portfolio with flashy UI, circuit animations, and Terminal Industries-inspired design',
    github_url: 'https://github.com/venkrx/portfoliovenkat',
    demo_url: '',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    topics: ['nextjs', 'react', 'framer-motion', 'tailwindcss'],
  },
  // Add more projects here as you build them
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const gradients = [
    'from-primary to-accent',
    'from-accent to-accent-purple',
    'from-accent-purple to-accent-pink',
    'from-accent-pink to-primary',
    'from-primary to-accent-purple',
    'from-accent to-accent-pink',
  ];


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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">{'<'}</span>
              Featured Projects
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-6 border border-primary/20 rounded-lg bg-black/30 backdrop-blur-sm hover:border-primary transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Project Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 leading-relaxed min-h-[48px]">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <FaStar className="text-yellow-500" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <FaCodeBranch className="text-primary" />
                      <span className="text-sm">{project.forks}</span>
                    </div>
                    {project.language && (
                      <span className="text-sm text-accent">{project.language}</span>
                    )}
                  </div>

                  {/* Topics/Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/30 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      <FaGithub className="text-xl" />
                      <span>Code</span>
                    </motion.a>
                    {project.demo_url && (
                      <motion.a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
