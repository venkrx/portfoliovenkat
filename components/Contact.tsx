'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

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

  const inputStyle = {
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-primary)',
    color: 'var(--text-body)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  } as React.CSSProperties;

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/venkatramks', label: 'GitHub', color: '#00ff41' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/venkatram-krishnapuram/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: FaInstagram, href: 'https://www.instagram.com/_ks_venkatram_/', label: 'Instagram', color: '#E1306C' },
    { icon: FaEnvelope, href: 'mailto:venkatram.ks@gmail.com', label: 'Email', color: '#0ff' },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-heading)' }}
            >
              <span className="text-primary">{'<'}</span>
              Get In Touch
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-body)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#00ff41')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-body)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#00ff41')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-body)' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = '#00ff41')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className="w-full py-3.5 font-semibold rounded-xl transition-all duration-300 glow-box"
                  style={{
                    backgroundColor: status === 'loading' ? 'rgba(100,100,100,0.5)' : '#00ff41',
                    color: '#000',
                    cursor: status === 'loading' ? 'not-allowed' : 'none',
                  }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </motion.button>

                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl text-center text-sm"
                    style={{
                      backgroundColor: status === 'success' ? 'rgba(0,255,65,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${status === 'success' ? 'rgba(0,255,65,0.4)' : 'rgba(239,68,68,0.4)'}`,
                      color: status === 'success' ? '#00ff41' : '#f87171',
                    }}
                  >
                    {statusMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div
                className="p-6 rounded-2xl backdrop-blur-sm"
                style={{ border: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-card)' }}
              >
                <h3 className="text-xl font-bold text-primary mb-3">Let's Connect!</h3>
                <p className="leading-relaxed mb-5 text-sm" style={{ color: 'var(--text-muted)' }}>
                  I'm always open to new projects, collaboration opportunities, or just a chat about AI and
                  technology. Don't hesitate to reach out!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-body)' }}>
                    <FaEnvelope className="text-primary" />
                    <span>venkatram.ks@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-body)' }}>
                    <span className="text-primary">📍</span>
                    <span>Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl backdrop-blur-sm"
                style={{ border: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-card)' }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Follow Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map(social => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.label !== 'Email' ? '_blank' : undefined}
                      rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl text-sm transition-all duration-200"
                      style={{
                        border: '1px solid var(--border-primary)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-muted)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = social.color;
                        el.style.color = social.color;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'var(--border-primary)';
                        el.style.color = 'var(--text-muted)';
                      }}
                    >
                      <social.icon className="text-xl flex-shrink-0" />
                      <span>{social.label}</span>
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 text-center text-sm"
            style={{ borderTop: '1px solid var(--border-primary)', color: 'var(--text-muted)' }}
          >
            © 2025 K S Venkatram. Built with{' '}
            <span className="text-primary">Next.js</span>,{' '}
            <span className="text-primary">TypeScript</span>, and{' '}
            <span className="text-primary">Framer Motion</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
