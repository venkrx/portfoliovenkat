'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const chatBubbles = [
  {
    id: 1,
    text: "Hey there! I'm Venkat — an AI engineering student who loves building things that actually matter.",
    delay: 0.25,
  },
  {
    id: 2,
    text: "I specialise in computer vision and agentic AI — training models that see, building pipelines that reason. Always open to research collaborations and engineering roles.",
    delay: 0.6,
  },
  {
    id: 3,
    text: "Got something interesting in mind? Drop me a message and I'll get back to you as soon as I can.",
    delay: 0.95,
  },
];

const socialLinks = [
  { icon: FaGithub,    href: 'https://github.com/venkatramks',                         label: 'GitHub',     handle: 'venkatramks',            color: 'var(--color-primary)', bg: 'rgba(var(--color-primary-rgb), 0.07)' },
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/venkatram-krishnapuram/',     label: 'LinkedIn',   handle: 'venkatram-krishnapuram',  color: '#3b9eff',              bg: 'rgba(59,158,255,0.07)'                },
  { icon: FaInstagram, href: 'https://www.instagram.com/_ks_venkatram_/',              label: 'Instagram',  handle: '_ks_venkatram_',           color: '#e1306c',              bg: 'rgba(225,48,108,0.07)'                },
  { icon: FaEnvelope,  href: 'mailto:venkatram.ks@gmail.com',                          label: 'Email',      handle: 'venkatram.ks@gmail.com',   color: 'var(--color-accent)',  bg: 'rgba(var(--color-accent-rgb), 0.07)'  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('https://formspree.io/f/xkgddaav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setStatusMessage("Message sent! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setStatusMessage('Failed to send. Please email me directly.');
    }
    setTimeout(() => { setStatus('idle'); setStatusMessage(''); }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(var(--color-primary-rgb), 0.04)',
    border: '1px solid var(--border-primary)',
    color: 'var(--text-body)',
    borderRadius: 10,
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
    fontSize: '0.875rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      <style>{`
        @property --flow-a {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes contact-flow {
          to { --flow-a: 360deg; }
        }
        .flow-wrap {
          padding: 1.5px;
          border-radius: 15px;
          background: conic-gradient(
            from var(--flow-a, 0deg),
            transparent 70%,
            rgba(0,255,65,0.75) 78%,
            rgba(0,229,255,0.7) 87%,
            transparent 93%
          );
          animation: contact-flow 5s linear infinite;
        }
        .flow-inner {
          border-radius: 13.5px;
          height: 100%;
          overflow: hidden;
        }
        .flow-wrap-chat {
          padding: 1.5px;
          border-radius: 20px;
          background: conic-gradient(
            from var(--flow-a, 0deg),
            transparent 70%,
            rgba(0,255,65,0.75) 78%,
            rgba(0,229,255,0.7) 87%,
            transparent 93%
          );
          animation: contact-flow 6s linear infinite;
        }
        .flow-inner-chat {
          border-radius: 18.5px;
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '10%', right: '-10%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.05) 0%, transparent 65%)',
          filter: 'blur(64px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-10%',
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 65%)',
          filter: 'blur(56px)',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 12,
          }}>// 05 — contact</p>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>
                Let&apos;s Connect<span className="text-primary">.</span>
              </h2>
              <div className="h-px mt-5" style={{
                background: 'linear-gradient(90deg, var(--color-primary), transparent)',
                maxWidth: 200,
              }} />
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-1"
              style={{
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)',
                border: '1px solid rgba(var(--color-primary-rgb), 0.25)',
                color: 'var(--color-primary)',
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Available for opportunities
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-14">

          {/* ── Chat window ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="flow-wrap-chat" style={{ animationDelay: '-2.5s', boxShadow: 'var(--shadow-card)' }}>
            <div className="flow-inner-chat">
            <div style={{
              backgroundColor: 'var(--bg-card)',
              display: 'flex', flexDirection: 'column',
            }}>

              {/* Chat header — gradient avatar + name + green dot */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 13,
                padding: '14px 18px',
                background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.07) 0%, rgba(var(--color-accent-rgb), 0.04) 100%)',
                borderBottom: '1px solid var(--border-primary)',
              }}>
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.82rem', fontWeight: 800, color: '#000',
                    fontFamily: 'ui-monospace, monospace',
                  }}>
                    KV
                  </div>
                  {/* Green online dot — NOT macOS */}
                  <div style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: 12, height: 12, borderRadius: '50%',
                    backgroundColor: '#00e676',
                    border: '2.5px solid var(--bg-card)',
                    boxShadow: '0 0 6px rgba(0,230,118,0.6)',
                  }} />
                </div>

                <div>
                  <p style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
                    K S Venkatram
                  </p>
                  <p style={{ color: '#00e676', fontSize: '0.7rem', fontWeight: 500, marginTop: 2 }}>
                    ● Online now
                  </p>
                </div>

                <div style={{ flex: 1 }} />

                <p style={{
                  fontSize: '0.65rem', fontFamily: 'ui-monospace, monospace',
                  color: 'var(--text-muted)', letterSpacing: '0.05em',
                  display: 'none',
                }} className="sm:block">
                  venkatram.ks@gmail.com
                </p>
              </div>

              {/* Pre-written chat bubbles */}
              <div style={{ padding: '20px 18px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {chatBubbles.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -18, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -18, scale: 0.96 }}
                    transition={{ duration: 0.45, delay: msg.delay, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', alignItems: 'flex-end', gap: 9 }}
                  >
                    {/* Mini avatar */}
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.48rem', fontWeight: 800, color: '#000',
                    }}>KV</div>

                    {/* Bubble */}
                    <div style={{
                      maxWidth: '82%', padding: '11px 15px',
                      borderRadius: '18px 18px 18px 4px',
                      backgroundColor: 'rgba(var(--color-primary-rgb), 0.07)',
                      border: '1px solid rgba(var(--color-primary-rgb), 0.14)',
                      color: 'var(--text-body)',
                      fontSize: '0.875rem', lineHeight: 1.65,
                    }}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* "Typing" indicator — subtle static decoration */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingLeft: 35, opacity: 0.4 }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.8, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: 'var(--border-primary)', margin: '0 18px' }} />

              {/* Form — embedded in the chat window */}
              <form onSubmit={handleSubmit} style={{ padding: '16px 18px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 9 }}>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} required placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)';
                    }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)';
                    }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 9, alignItems: 'flex-end' }}>
                  <textarea
                    name="message" value={formData.message}
                    onChange={handleChange} required rows={3}
                    placeholder="Type your message here..."
                    style={{ ...inputStyle, resize: 'none', flex: 1 }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)';
                    }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                  />

                  {/* Send button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: status === 'loading'
                        ? 'rgba(100,100,100,0.25)'
                        : 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                      border: 'none', color: '#000',
                      cursor: status === 'loading' ? 'not-allowed' : 'none',
                      fontSize: '0.95rem',
                      boxShadow: status === 'loading' ? 'none' : '0 4px 18px rgba(var(--color-primary-rgb), 0.3)',
                    }}
                  >
                    {status === 'loading' ? (
                      <motion.div
                        style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #000', borderTopColor: 'transparent' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <FaPaperPlane style={{ transform: 'translateX(1px)' }} />
                    )}
                  </motion.button>
                </div>

                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: 10, padding: '10px 14px', borderRadius: 10, fontSize: '0.8rem',
                      backgroundColor: status === 'success' ? 'rgba(var(--color-primary-rgb), 0.07)' : 'rgba(239,68,68,0.07)',
                      border: `1px solid ${status === 'success' ? 'rgba(var(--color-primary-rgb), 0.3)' : 'rgba(239,68,68,0.3)'}`,
                      color: status === 'success' ? 'var(--color-primary)' : '#f87171',
                    }}
                  >
                    <span style={{ opacity: 0.7 }}>{status === 'success' ? '✓ ' : '✗ '}</span>
                    {statusMessage}
                  </motion.div>
                )}
              </form>
            </div>
            </div>
            </div>
          </motion.div>

          {/* ── Right info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            {/* Status card — plain */}
            <div style={{
              borderRadius: 15,
              padding: '20px 22px',
              background: 'linear-gradient(135deg, rgba(0,255,65,0.06) 0%, rgba(0,255,65,0.02) 100%)',
              border: '1px solid var(--border-primary)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <motion.div
                  style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-primary)', flexShrink: 0 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.92rem' }}>
                  Online · Open to Work
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.65, paddingLeft: 20 }}>
                Computer Vision · AI Agents · Full-Stack
              </p>
            </div>

            {/* Contact details — flowing border */}
            <div className="flow-wrap" style={{ animationDelay: '-1.7s' }}>
              <div className="flow-inner" style={{
                padding: '20px 22px',
                backgroundColor: 'var(--bg-card)',
              }}>
              <p style={{
                color: 'var(--text-muted)', fontSize: '0.65rem',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                marginBottom: 14, fontFamily: 'ui-monospace, monospace',
              }}>
                Direct Contact
              </p>
              <div className="space-y-3">
                {[
                  { Icon: FaEnvelope, label: 'Email', value: 'venkatram.ks@gmail.com', color: 'var(--color-primary)', bg: 'rgba(var(--color-primary-rgb), 0.1)', border: 'rgba(var(--color-primary-rgb), 0.22)' },
                  { Icon: FaMapMarkerAlt, label: 'Location', value: 'Chennai, Tamil Nadu, India', color: 'var(--color-accent)', bg: 'rgba(var(--color-accent-rgb), 0.1)', border: 'rgba(var(--color-accent-rgb), 0.22)' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: item.bg, border: `1px solid ${item.border}`,
                    }}>
                      <item.Icon style={{ color: item.color, fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                        {item.label}
                      </p>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.8rem', fontWeight: 500, marginTop: 1 }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Social links — flowing border */}
            <div className="flow-wrap" style={{ animationDelay: '-3.4s' }}>
              <div className="flow-inner" style={{
                padding: '20px 22px',
                backgroundColor: 'var(--bg-card)',
              }}>
              <p style={{
                color: 'var(--text-muted)', fontSize: '0.65rem',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                marginBottom: 14, fontFamily: 'ui-monospace, monospace',
              }}>
                Find Me On
              </p>
              <div className="space-y-2.5">
                {socialLinks.map(social => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: social.bg,
                      border: `1px solid ${social.color}30`,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${social.color}65`;
                      el.style.boxShadow = `0 3px 14px ${social.color}15`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${social.color}30`;
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: `${social.color}14`,
                      border: `1px solid ${social.color}30`,
                    }}>
                      <social.icon style={{ color: social.color, fontSize: '0.95rem' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.2 }}>
                        {social.label}
                      </p>
                      <p style={{
                        color: 'var(--text-muted)', fontSize: '0.7rem',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {social.handle}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 text-center text-sm"
          style={{ borderTop: '1px solid var(--border-primary)', color: 'var(--text-muted)' }}
        >
          © 2026 K S Venkatram · Built with{' '}
          <span className="text-primary">Next.js</span>,{' '}
          <span className="text-primary">TypeScript</span>, and{' '}
          <span className="text-primary">Framer Motion</span>
        </motion.div>
      </div>
    </section>
  );
}
