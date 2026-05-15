'use client';

import { motion } from 'framer-motion';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Interests from "@/components/Interests";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

// Each section rises up as it enters the viewport
const rise = {
  initial: { opacity: 0, y: 55 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.04 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Home() {
  return (
    <main className="relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      <Navbar />
      <Hero />

      <motion.div {...rise} style={{ backgroundColor: 'var(--bg-base)' }} className="relative z-10">
        <About />
      </motion.div>

      <motion.div {...rise} style={{ backgroundColor: 'var(--bg-card-solid)' }} className="relative z-10">
        <Interests />
      </motion.div>

      <motion.div {...rise} style={{ backgroundColor: 'var(--bg-base)' }} className="relative z-10">
        <Skills />
      </motion.div>

      <motion.div {...rise} className="relative z-10">
        <Projects />
      </motion.div>

      <motion.div {...rise} style={{ backgroundColor: 'var(--bg-card-solid)' }} className="relative z-10">
        <Experience />
      </motion.div>

      <motion.div {...rise} style={{ backgroundColor: 'var(--bg-base)' }} className="relative z-10">
        <Contact />
      </motion.div>
    </main>
  );
}
