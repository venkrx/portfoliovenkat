'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaMusic, FaGamepad, FaRunning } from 'react-icons/fa';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: FaCode,
      title: 'AI & Machine Learning',
      description: 'Passionate about developing intelligent systems and exploring deep learning algorithms',
    },
    {
      icon: FaCode,
      title: 'Full Stack Development',
      description: 'Building scalable applications with modern frameworks and technologies',
    },
    {
      icon: FaMusic,
      title: 'Beyond Tech',
      description: 'Tennis player, singer, and Valorant enthusiast',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">{'<'}</span>
              About Me
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </motion.div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a <span className="text-primary font-semibold">3rd-year AI Engineering student</span> at{' '}
                <span className="text-accent font-semibold">Amrita Vishwa Vidyapeetham, Coimbatore</span>, 
                driven by a passion for artificial intelligence and innovative technology solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in tech has been fueled by curiosity and a desire to create impactful solutions. 
                I specialize in <span className="text-primary">machine learning</span>, 
                <span className="text-primary"> deep learning</span>, 
                <span className="text-primary"> LLMs</span>, and 
                <span className="text-primary"> full-stack development</span>, constantly pushing the boundaries 
                of what's possible with AI.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, I play <span className="text-primary">tennis</span>, love 
                <span className="text-primary"> singing</span>, and play 
                <span className="text-primary"> Valorant</span> with friends.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {[
                { label: 'Projects Completed', value: '15+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Years of Learning', value: '3+' },
                { label: 'Coffee Consumed', value: '∞' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 border border-primary/30 rounded-lg bg-black/30 backdrop-blur-sm hover:border-primary transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-6 border border-primary/20 rounded-lg bg-black/30 backdrop-blur-sm hover:border-primary transition-all duration-300 group"
              >
                <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
