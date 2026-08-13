'use client';

import { motion, useInView } from 'framer-motion';
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

export default function Publications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.12 });

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false });

  const applyTransforms = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = (cardCenter - viewportCenter) / card.offsetWidth;
      const abs = Math.min(Math.abs(dist), 2);
      const scale = 1 - abs * 0.15;
      const opacity = Math.max(0.3, 1 - abs * 0.55);
      const rotateY = Math.max(-26, Math.min(26, dist * 24));
      const blur = abs * 2.4;
      const translateZ = -abs * 70;

      card.style.transform = `perspective(1400px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
      card.style.opacity = String(opacity);
      card.style.filter = `blur(${blur}px)`;
      card.style.zIndex = String(100 - Math.round(abs * 10));

      if (Math.abs(dist) < nearestDist) {
        nearestDist = Math.abs(dist);
        nearest = i;
      }
    });

    setActiveIndex(prev => (prev === nearest ? prev : nearest));
  }, []);

  useEffect(() => {
    applyTransforms();
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyTransforms);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const settleTimer = setTimeout(applyTransforms, 300); // catch late image-layout reflow

    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
    };
  }, [applyTransforms]);

  const scrollToIndex = (i: number) => {
    const card = cardRefs.current[i];
    const track = trackRef.current;
    if (!card || !track) return;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: 'smooth',
    });
  };

  // Drag-to-scroll for desktop pointer users
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { dragging: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    track.scrollLeft = dragState.current.startScroll - dx;
  };
  const endDrag = () => {
    dragState.current.dragging = false;
  };

  return (
    <>
      <style>{`
        @keyframes pub-shine {
          from { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
          15%  { opacity: 0.9; }
          to   { transform: translateX(130%) skewX(-12deg); opacity: 0; }
        }
        .pub-card:hover .pub-card-shine { animation: pub-shine 1.15s ease; }

        .pub-track {
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .pub-track::-webkit-scrollbar { display: none; }
        .pub-card { scroll-snap-align: center; transform-style: preserve-3d; }

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
          ref={trackRef}
          className="pub-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'flex',
            alignItems: 'stretch',
            gap: 32,
            padding: '48px 6vw 40px',
            cursor: 'grab',
            perspective: 1400,
          }}
        >
          {entries.map((entry, i) => (
            <div
              key={entry.title}
              ref={el => { cardRefs.current[i] = el; }}
              className="pub-card group relative flex-shrink-0 overflow-hidden rounded-2xl"
              style={{
                width: 'min(86vw, 390px)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
                willChange: 'transform, filter, opacity',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-hover)';
                el.style.boxShadow = '0 14px 44px rgba(0,0,0,0.35)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-primary)';
                el.style.boxShadow = 'var(--shadow-card)';
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
            </div>
          ))}
        </div>

        {/* Bottom film-strip letterbox */}
        <div className="pub-reel-bar" />

        {/* Reel counter + nav + dots */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex items-center justify-center gap-6">
          <button
            aria-label="Previous"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
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
                onClick={() => scrollToIndex(i)}
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
            onClick={() => scrollToIndex(Math.min(entries.length - 1, activeIndex + 1))}
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
