'use client';

import Hero from "@/components/Hero";
import About from "@/components/About";
import Interests from "@/components/Interests";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      <Navbar />
      <Hero />

      {/* Alternating bg-base / bg-card-solid creates subtle visual rhythm */}
      <div style={{ backgroundColor: 'var(--bg-base)' }} className="relative z-10">
        <About />
      </div>

      <div style={{ backgroundColor: 'var(--bg-card-solid)' }} className="relative z-10">
        <Interests />
      </div>

      <div style={{ backgroundColor: 'var(--bg-base)' }} className="relative z-10">
        <Skills />
      </div>

      <div className="relative z-10">
        <Projects />
      </div>

      <div style={{ backgroundColor: 'var(--bg-card-solid)' }} className="relative z-10">
        <Experience />
      </div>

      <div style={{ backgroundColor: 'var(--bg-base)' }} className="relative z-10">
        <Contact />
      </div>
    </main>
  );
}
