'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
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

  const inputBase: React.CSSProperties = {
    backgroundColor: 'rgba(4,10,22,0.7)',
    border: '1px solid var(--border-primary)',
    color: 'var(--text-body)',
    borderRadius: '0.6rem',
    padding: '0.8rem 1rem 0.8rem 2.4rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontSize: '0.9rem',
    fontFamily: 'ui-monospace, monospace',
  };

  const socialLinks = [
    { icon: FaGithub,    href: 'https://github.com/venkatramks',                          label: 'GitHub',     handle: 'venkatramks',           color: 'var(--color-primary)', bg: 'rgba(var(--color-primary-rgb), 0.07)' },
    { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/venkatram-krishnapuram/',      label: 'LinkedIn',   handle: 'venkatram-krishnapuram',  color: '#3b9eff',              bg: 'rgba(59,158,255,0.07)'                },
    { icon: FaInstagram, href: 'https://www.instagram.com/_ks_venkatram_/',               label: 'Instagram',  handle: '_ks_venkatram_',           color: '#e1306c',              bg: 'rgba(225,48,108,0.07)'                },
    { icon: FaEnvelope,  href: 'mailto:venkatram.ks@gmail.com',                           label: 'Email',      handle: 'venkatram.ks@gmail.com',   color: 'var(--color-accent)',  bg: 'rgba(var(--color-accent-rgb), 0.07)'  },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
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

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
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
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>
            <span className="text-primary">{'<'}</span>
            Get In Touch
            <span className="text-primary">{' />'}</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Have a project in mind or want to collaborate? Let&apos;s make something great.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-14">

          {/* Terminal form card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-card)',
            }}>
              {/* Terminal title bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px',
                backgroundColor: 'rgba(4,10,22,0.98)',
                borderBottom: '1px solid rgba(var(--color-primary-rgb), 0.1)',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#febc2e' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#28c840' }} />
                </div>
                <span style={{
                  color: 'rgba(var(--color-primary-rgb), 0.55)',
                  fontSize: '0.72rem',
                  fontFamily: 'ui-monospace, monospace',
                  marginLeft: 6,
                }}>
                  venkat@portfolio:~/contact — send_message.sh
                </span>
              </div>

              {/* Form body */}
              <div style={{ padding: '24px 28px', backgroundColor: 'var(--bg-card)' }}>
                <p style={{
                  fontFamily: 'ui-monospace, monospace',
                  color: 'var(--color-primary)',
                  fontSize: '0.78rem',
                  marginBottom: 22,
                  opacity: 0.8,
                }}>
                  {`> Initializing contact protocol... ready`}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label style={{
                      display: 'block', marginBottom: 6,
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                    }}>
                      <span style={{ color: 'var(--color-primary)' }}>$</span>{' '}name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                        color: 'var(--color-primary)', fontSize: '0.72rem',
                        fontFamily: 'ui-monospace, monospace', opacity: 0.7,
                      }}>›</span>
                      <input
                        type="text" name="name" value={formData.name}
                        onChange={handleChange} required placeholder="Your name"
                        style={inputBase}
                        onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block', marginBottom: 6,
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                    }}>
                      <span style={{ color: 'var(--color-primary)' }}>$</span>{' '}email
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                        color: 'var(--color-primary)', fontSize: '0.72rem',
                        fontFamily: 'ui-monospace, monospace', opacity: 0.7,
                      }}>›</span>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange} required placeholder="your.email@example.com"
                        style={inputBase}
                        onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{
                      display: 'block', marginBottom: 6,
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                    }}>
                      <span style={{ color: 'var(--color-primary)' }}>$</span>{' '}message
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: '0.85rem', top: '0.85rem',
                        color: 'var(--color-primary)', fontSize: '0.72rem',
                        fontFamily: 'ui-monospace, monospace', opacity: 0.7,
                      }}>›</span>
                      <textarea
                        name="message" value={formData.message}
                        onChange={handleChange} required rows={5}
                        placeholder="Tell me about your project or idea..."
                        style={{ ...inputBase, resize: 'none', padding: '0.8rem 1rem 0.8rem 2.4rem' }}
                        onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                    className="w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2.5"
                    style={{
                      background: status === 'loading'
                        ? 'rgba(100,100,100,0.3)'
                        : 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                      color: '#000',
                      cursor: status === 'loading' ? 'not-allowed' : 'none',
                      boxShadow: status === 'loading' ? 'none' : '0 4px 22px rgba(var(--color-primary-rgb), 0.28)',
                      fontSize: '0.88rem',
                      letterSpacing: '0.04em',
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {status === 'loading' ? (
                      '[ executing... ]'
                    ) : (
                      `> exec send-message.sh`
                    )}
                  </motion.button>

                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-sm font-mono"
                      style={{
                        backgroundColor: status === 'success' ? 'rgba(var(--color-primary-rgb), 0.07)' : 'rgba(239,68,68,0.07)',
                        border: `1px solid ${status === 'success' ? 'rgba(var(--color-primary-rgb), 0.3)' : 'rgba(239,68,68,0.3)'}`,
                        color: status === 'success' ? 'var(--color-primary)' : '#f87171',
                      }}
                    >
                      <span style={{ opacity: 0.6 }}>{status === 'success' ? '✓' : '✗'} </span>
                      {statusMessage}
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            {/* Status card */}
            <div style={{
              padding: '20px 22px', borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb),0.06) 0%, rgba(var(--color-primary-rgb),0.02) 100%)',
              border: '1px solid rgba(var(--color-primary-rgb), 0.2)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <motion.div
                  style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-primary)', flexShrink: 0 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                  Online · Open to Work
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, paddingLeft: 20 }}>
                AI Internships · Research Roles · Full-Stack Projects
              </p>
            </div>

            {/* Contact details */}
            <div style={{
              padding: '20px 22px', borderRadius: 14,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, fontFamily: 'ui-monospace,monospace' }}>
                Direct Contact
              </p>
              <div className="space-y-3">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                    border: '1px solid rgba(var(--color-primary-rgb), 0.22)',
                  }}>
                    <FaEnvelope style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email</p>
                    <p style={{ color: 'var(--text-body)', fontSize: '0.82rem', fontWeight: 500 }}>venkatram.ks@gmail.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                    border: '1px solid rgba(var(--color-accent-rgb), 0.22)',
                  }}>
                    <FaMapMarkerAlt style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Location</p>
                    <p style={{ color: 'var(--text-body)', fontSize: '0.82rem', fontWeight: 500 }}>Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div style={{
              padding: '20px 22px', borderRadius: 14,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, fontFamily: 'ui-monospace,monospace' }}>
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
                      backgroundColor: `${social.color}14`, border: `1px solid ${social.color}30`,
                    }}>
                      <social.icon style={{ color: social.color, fontSize: '0.95rem' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.2 }}>
                        {social.label}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {social.handle}
                      </p>
                    </div>
                  </motion.a>
                ))}
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
          © 2026 K S Venkatram. Built with{' '}
          <span className="text-primary">Next.js</span>,{' '}
          <span className="text-primary">TypeScript</span>, and{' '}
          <span className="text-primary">Framer Motion</span>
        </motion.div>
      </div>
    </section>
  );
}
