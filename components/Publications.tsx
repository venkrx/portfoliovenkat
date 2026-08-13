'use client';

import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { FaBookOpen, FaTrophy, FaMedal, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Entry =
  | {
      kind: 'publication';
      title: string;
      badge: string;
      description: string;
      link: string;
    }
  | {
      kind: 'achievement';
      title: string;
      badge: string;
      description: string;
      image: string;
      icon: typeof FaTrophy;
    };

const entries: Entry[] = [
  {
    kind: 'publication',
    title: 'Hand Gesture-Driven Speech Aid for Mute Individuals',
    badge: 'Published · IEEE',
    description:
      'Real-time gesture-to-speech system using flex sensors and an accelerometer on Arduino Mega, with a KNN classifier reaching 90.91% accuracy on the test set.',
    link: 'https://ieeexplore.ieee.org/abstract/document/10957074',
  },
  {
    kind: 'achievement',
    title: 'Build With India',
    badge: 'Top 20%',
    description: 'Placed among the top 5,000 of 25,000 participating teams — Finale at the Google Office.',
    image: '/buildwithindia.jpg',
    icon: FaTrophy,
  },
  {
    kind: 'achievement',
    title: 'Innovate4FinLit Game Challenge',
    badge: 'Finalist',
    description: 'Recognized as a Finalist for innovation in financial-literacy gaming, powered by H2Skill.',
    image: '/innovate_finlit.jpg',
    icon: FaMedal,
  },
];

const GAP = 32;

export default function Publications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.12 });

  const outerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  // x position (in px) at which card `i` sits centered in the viewport
  const targetFor = useCallback((i: number) => {
    const outer = outerRef.current;
    const card = firstCardRef.current;
    if (!outer || !card) return 0;
    const step = card.offsetWidth + GAP;
    return outer.clientWidth / 2 - (i * step + card.offsetWidth / 2);
  }, []);

  const goTo = useCallback((i: number, animateIt = true) => {
    const clamped = Math.max(0, Math.min(entries.length - 1, i));
    setActiveIndex(clamped);
    const target = targetFor(clamped);
    if (animateIt) {
      animate(x, target, { type: 'spring', stiffness: 260, damping: 32 });
    } else {
      x.set(target);
    }
  }, [targetFor, x]);

  useEffect(() => {
    goTo(0, false);
    const onResize = () => goTo(activeIndex, false);
    window.addEventListener('resize', onResize);
    const settleTimer = setTimeout(() => goTo(activeIndex, false), 300); // catch image-layout reflow
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(settleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const card = firstCardRef.current;
    const step = (card?.offsetWidth ?? 390) + GAP;
    const swipe = info.offset.x + info.velocity.x * 0.25;
    const delta = Math.round(-swipe / step);
    goTo(activeIndex + delta);
  };

  const minX = targetFor(entries.length - 1);
  const maxX = targetFor(0);

  return (
    <>
      <style>{`
        @keyframes pub-shine {
          from { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
          15%  { opacity: 0.9; }
          to   { transform: translateX(130%) skewX(-12deg); opacity: 0; }
        }
        .pub-card:hover .pub-card-shine { animation: pub-shine 1.15s ease; }

        .pub-reel-bar {
          height: 12px;
          background: repeating-radial-gradient(circle at center, rgba(232,244,255,0.4) 0 2px, transparent 2.5px 3px), #05070c;
          background-size: 28px 12px;
          background-repeat: repeat-x;
          background-position: center;
        }
      `}</style>

      <section id="publications" className="relative py-20 md:py-32 overflow-hidden" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.78rem', letterSpacing: '0.16em',
              color: 'var(--color-primary)', marginBottom: 10, opacity: 0.85,
            }}>{'> reel.now_showing() ↵'}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>
              Publications &amp; Achievements
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-5 rounded-full" />
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Research published and milestones earned along the way
            </p>
          </motion.div>
        </div>

        {/* Top film-strip letterbox */}
        <div className="pub-reel-bar" />

        {/* Coverflow track */}
        <div
          ref={outerRef}
          style={{ overflow: 'hidden', padding: '48px 0 40px', perspective: 1400 }}
        >
          <motion.div
            style={{ x, display: 'flex', alignItems: 'stretch', gap: GAP, width: 'max-content', cursor: 'grab' }}
            drag="x"
            dragConstraints={{ left: minX, right: maxX }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
          >
            {entries.map((entry, i) => {
              const diff = i - activeIndex;
              const abs = Math.min(Math.abs(diff), 2);
              return (
                <motion.div
                  key={entry.title}
                  ref={i === 0 ? firstCardRef : undefined}
                  className="pub-card group relative flex-shrink-0 overflow-hidden rounded-2xl"
                  animate={{
                    scale: 1 - abs * 0.15,
                    opacity: Math.max(0.3, 1 - abs * 0.55),
                    rotateY: Math.max(-26, Math.min(26, diff * 22)),
                    filter: `blur(${abs * 2.4}px)`,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                  style={{
                    width: 'min(86vw, 390px)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-card)',
                    zIndex: 100 - Math.round(abs * 10),
                    pointerEvents: diff === 0 ? 'auto' : 'auto',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border-hover)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border-primary)';
                  }}
                >
                  {/* Projector-light sweep on hover */}
                  <div
                    className="pub-card-shine pointer-events-none absolute inset-0 z-20"
                    style={{
                      background: 'linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
                      opacity: 0,
                    }}
                  />

                  {/* Top gradient strip */}
                  <div style={{
                    height: 2,
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                    opacity: 0.6,
                  }} />

                  {entry.kind === 'achievement' ? (
                    <>
                      <div
                        className="relative w-full flex items-center justify-center"
                        style={{ height: 210, backgroundColor: 'var(--bg-card-solid)' }}
                      >
                        <Image
                          src={entry.image}
                          alt={entry.title}
                          fill
                          sizes="390px"
                          draggable={false}
                          style={{ objectFit: 'contain', padding: 14 }}
                        />
                        <span
                          className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.55)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            color: '#fff',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <entry.icon style={{ color: 'var(--color-primary)', fontSize: '0.75rem' }} />
                          {entry.badge}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                          {entry.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {entry.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-6" style={{ minHeight: 210 + 96 }}>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: 'rgba(0,255,65,0.1)',
                            border: '1px solid rgba(0,255,65,0.3)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          <motion.span
                            style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                          />
                          {entry.badge}
                        </span>
                        <FaBookOpen style={{ color: 'var(--color-accent)', fontSize: '1.1rem' }} />
                      </div>

                      <h3 className="text-xl font-semibold mb-3 leading-snug" style={{ color: 'var(--text-heading)' }}>
                        {entry.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                        {entry.description}
                      </p>

                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable={false}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          backgroundColor: 'rgba(0,229,255,0.1)',
                          border: '1px solid rgba(0,229,255,0.35)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        Read Paper <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom film-strip letterbox */}
        <div className="pub-reel-bar" />

        {/* Reel counter + nav + dots */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex items-center justify-center gap-6">
          <button
            aria-label="Previous"
            onClick={() => goTo(activeIndex - 1)}
            className="p-2 rounded-full transition-colors"
            style={{ border: '1px solid var(--border-primary)', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)' }}
          >
            <FaChevronLeft size={12} />
          </button>

          <span style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem',
            letterSpacing: '0.1em', color: 'var(--color-primary)', minWidth: 60, textAlign: 'center',
          }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-2">
            {entries.map((entry, i) => (
              <button
                key={entry.title}
                aria-label={`Go to ${entry.title}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeIndex ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: i === activeIndex ? 'var(--color-primary)' : 'var(--border-primary)',
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            aria-label="Next"
            onClick={() => goTo(activeIndex + 1)}
            className="p-2 rounded-full transition-colors"
            style={{ border: '1px solid var(--border-primary)', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)' }}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </section>
    </>
  );
}
