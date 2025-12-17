'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage('Failed to send message. Please try emailing me directly.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try emailing me directly.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setStatusMessage('');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/venkatramks', label: 'GitHub', color: 'hover:text-primary' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/venkatram-krishnapuram/', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: 'https://www.instagram.com/_ks_venkatram_/', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: FaEnvelope, href: 'mailto:venkatram.ks@gmail.com', label: 'Email', color: 'hover:text-accent' },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-black/30" ref={ref}>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">{'<'}</span>
              Get In Touch
              <span className="text-primary">{' />'}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className={`w-full px-8 py-4 font-semibold rounded-lg transition-all duration-300 glow-box ${
                    status === 'loading'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-primary text-black hover:bg-primary-dark'
                  }`}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </motion.button>
                
                {/* Status Messages */}
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-center ${
                      status === 'success'
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : 'bg-red-500/20 border border-red-500/50 text-red-400'
                    }`}
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
              className="space-y-8"
            >
              <div className="p-6 border border-primary/20 rounded-lg bg-black/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-primary mb-4">Let's Connect!</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I'm always interested in hearing about new projects, collaboration opportunities, 
                  or just having a chat about AI and technology. Don't hesitate to reach out!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaEnvelope className="text-primary text-xl" />
                    <span>venkatram.ks@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-primary text-xl">📍</span>
                    <span>Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 border border-primary/20 rounded-lg bg-black/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.label !== 'Email' ? '_blank' : undefined}
                      rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 p-3 border border-primary/20 rounded-lg bg-black/20 text-gray-300 ${social.color} transition-all duration-300`}
                    >
                      <social.icon className="text-2xl" />
                      <span className="text-sm">{social.label}</span>
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
            className="mt-16 pt-8 border-t border-primary/20 text-center"
          >
            <p className="text-gray-400">
              © 2025 K S Venkatram. Built with{' '}
              <span className="text-primary">Next.js</span>,{' '}
              <span className="text-primary">TypeScript</span>, and{' '}
              <span className="text-primary">Framer Motion</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
