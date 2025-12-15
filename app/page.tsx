'use client';

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import FloatingLogo from "@/components/FloatingLogo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Keep all sections black
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#000000', '#000000', '#000000', '#000000', '#000000']
  );

  return (
    <main ref={containerRef} className="relative">
      <Navbar />
      <FloatingLogo />
      <Hero />
      
      {/* Black section - About */}
      <motion.div 
        style={{ backgroundColor: '#000000' }}
        className="relative z-10"
      >
        <About />
      </motion.div>

      {/* Transition to White - Skills */}
      <motion.div 
        style={{ backgroundColor }}
        className="relative z-10 transition-colors duration-1000"
      >
        <Skills />
      </motion.div>

      {/* Back to Black - Projects */}
      <motion.div 
        style={{ backgroundColor: '#000000' }}
        className="relative z-10"
      >
        <Projects />
      </motion.div>

      {/* Black - Experience */}
      <motion.div 
        style={{ backgroundColor: '#000000' }}
        className="relative z-10"
      >
        <Experience />
      </motion.div>

      {/* Black - Contact */}
      <motion.div 
        style={{ backgroundColor: '#000000' }}
        className="relative z-10"
      >
        <Contact />
      </motion.div>
    </main>
  );
}
