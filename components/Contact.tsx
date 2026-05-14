'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
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
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-primary)',
    color: 'var(--text-body)',
    borderRadius: '0.75rem',
    padding: '0.875rem 1.125rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontSize: '0.925rem',
  };

  const socialLinks = [
    { icon: FaGithub,    href: 'https://github.com/venkatramks',                             label: 'GitHub',    color: '#00ff41', bg: 'rgba(0,255,65,0.07)'     },
    { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/venkatram-krishnapuram/',         label: 'LinkedIn',  color: '#3b9eff', bg: 'rgba(59,158,255,0.07)'   },
    { icon: FaInstagram, href: 'https://www.instagram.com/_ks_venkatram_/',                  label: 'Instagram', color: '#e1306c', bg: 'rgba(225,48,108,0.07)'   },
    { icon: FaEnvelope,  href: 'mailto:venkatram.ks@gmail.com',                              label: 'Email me',  color: '#00e5ff', bg: 'rgba(0,229,255,0.07)'    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '15%', right: '-8%',
          width: 440, height: 440,
          background: 'radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 65%)',
          filter: 'blur(64px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-8%',
          width: 360, height: 360,
          background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%)',
          filter: 'blur(56px)',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{
              backgroundColor: 'rgba(0,255,65,0.08)',
              border: '1px solid rgba(0,255,65,0.25)',
              color: 'var(--color-primary)',
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Currently available for opportunities
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

          {/* Contact form — wider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div
              className="rounded-2xl p-7 backdrop-blur-sm relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Corner glow accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 140, height: 140,
                background: 'radial-gradient(circle at top right, rgba(0,255,65,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    Name
                  </label>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} required placeholder="Your Name"
                    style={inputBase}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,255,65,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    Email
                  </label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="your.email@example.com"
                    style={inputBase}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,255,65,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    Message
                  </label>
                  <textarea
                    name="message" value={formData.message}
                    onChange={handleChange} required rows={5}
                    placeholder="Tell me about your project or idea..."
                    style={{ ...inputBase, resize: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,255,65,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-primary)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className="w-full py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5"
                  style={{
                    background: status === 'loading'
                      ? 'rgba(100,100,100,0.4)'
                      : 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    color: '#000',
                    cursor: status === 'loading' ? 'not-allowed' : 'none',
                    boxShadow: status === 'loading' ? 'none' : '0 4px 22px rgba(0,255,65,0.28)',
                    fontSize: '0.95rem',
                  }}
                >
                  {status === 'loading' ? (
                    'Sending…'
                  ) : (
                    <>
                      <FaPaperPlane style={{ fontSize: '0.8rem' }} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl text-center text-sm"
                    style={{
                      backgroundColor: status === 'success' ? 'rgba(0,255,65,0.08)' : 'rgba(239,68,68,0.08)',
                      border: `1px solid ${status === 'success' ? 'rgba(0,255,65,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      color: status === 'success' ? 'var(--color-primary)' : '#f87171',
                    }}
                  >
                    {statusMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 space-y-5"
          >
            {/* Contact details */}
            <div
              className="rounded-2xl p-6 backdrop-blur-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 className="text-lg font-bold mb-5" style={{ color: 'var(--text-heading)' }}>
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.25)',
                  }}>
                    <FaEnvelope style={{ color: 'var(--color-primary)', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>Email</p>
                    <p style={{ color: 'var(--text-body)', fontSize: '0.875rem', fontWeight: 500 }}>venkatram.ks@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)',
                  }}>
                    <FaMapMarkerAlt style={{ color: 'var(--color-accent)', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>Location</p>
                    <p style={{ color: 'var(--text-body)', fontSize: '0.875rem', fontWeight: 500 }}>Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              className="rounded-2xl p-6 backdrop-blur-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-heading)' }}>
                Find Me On
              </h3>
              <div className="space-y-3">
                {socialLinks.map(social => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label !== 'Email me' ? '_blank' : undefined}
                    rel={social.label !== 'Email me' ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: social.bg,
                      border: `1px solid ${social.color}30`,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${social.color}70`;
                      el.style.boxShadow = `0 4px 16px ${social.color}18`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${social.color}30`;
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: `${social.color}14`, border: `1px solid ${social.color}35`,
                    }}>
                      <social.icon style={{ color: social.color, fontSize: '1rem' }} />
                    </div>
                    <span style={{ color: 'var(--text-body)', fontWeight: 500, fontSize: '0.9rem' }}>
                      {social.label}
                    </span>
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
          © 2025 K S Venkatram. Built with{' '}
          <span className="text-primary">Next.js</span>,{' '}
          <span className="text-primary">TypeScript</span>, and{' '}
          <span className="text-primary">Framer Motion</span>
        </motion.div>
      </div>
    </section>
  );
}
