'use client';

import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const sectionIds = ['home', 'about', 'interests', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggle }                 = useTheme();
  const { scrollYProgress }               = useScroll();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find which section is currently dominant in the viewport
      const trigger = window.scrollY + window.innerHeight * 0.38;
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= trigger) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Home',       href: '#home'       },
    { name: 'About',      href: '#about'      },
    { name: 'Interests',  href: '#interests'  },
    { name: 'Skills',     href: '#skills'     },
    { name: 'Projects',   href: '#projects'   },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact',    href: '#contact'    },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-primary)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="#home" className="font-bold text-primary glow-text tracking-tight flex items-center gap-1 text-xl">
              <span className="opacity-60">{'<'}</span>
              <span>Venkat</span>
              <span className="opacity-60">{'/>'}</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-7">
              {navItems.map((item, index) => {
                const isActive = '#' + activeSection === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      className="relative text-sm font-medium transition-colors duration-200 group"
                      style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-muted)' }}
                      onMouseEnter={e => {
                        if (!isActive) (e.target as HTMLElement).style.color = 'var(--color-primary)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) (e.target as HTMLElement).style.color = 'var(--text-muted)';
                      }}
                    >
                      {item.name}
                      {/* Underline — full width when active, hover-expands otherwise */}
                      <motion.span
                        className="absolute -bottom-0.5 left-0 h-px bg-primary"
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              {/* Theme toggle */}
              <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.12, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 p-2 rounded-full border transition-all duration-300"
                style={{
                  borderColor: 'var(--border-primary)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-heading)',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FaSun className="text-primary" size={14} />
                ) : (
                  <FaMoon className="text-primary" size={14} />
                )}
              </motion.button>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="md:hidden flex items-center gap-3">
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full border"
                style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-card)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FaSun className="text-primary" size={14} />
                ) : (
                  <FaMoon className="text-primary" size={14} />
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(o => !o)}
                style={{ color: 'var(--text-heading)' }}
              >
                {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-4"
            style={{ backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(16px)' }}
          >
            {navItems.map(item => {
              const isActive = '#' + activeSection === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm font-medium border-b transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                    borderColor: 'var(--border-primary)',
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
