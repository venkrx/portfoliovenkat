'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/venkatramks/repos?sort=updated&per_page=6');
        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-400">Loading projects from GitHub...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {repos.map((project, index) => (
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
                    {project.description || 'Check out this project on GitHub'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <FaStar className="text-yellow-500" />
                      <span className="text-sm">{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <FaCodeBranch className="text-primary" />
                      <span className="text-sm">{project.forks_count}</span>
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
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      <FaGithub className="text-xl" />
                      <span>Code</span>
                    </motion.a>
                    {project.homepage && (
                      <motion.a
                        href={project.homepage}
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
