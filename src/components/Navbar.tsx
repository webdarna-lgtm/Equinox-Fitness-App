import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = ['Programs', 'Dashboard', 'Trainers', 'Analytics', 'Pricing'];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="material-icons text-black text-lg" style={{fontFamily:'Material Icons'}}>bolt</span>
          </div>
          <span className="font-display text-2xl tracking-wider text-white">EQUINOX</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted hover:text-white transition-colors duration-300 tracking-wide"
              whileHover={{ y: -1 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-muted hover:text-white transition-colors px-4 py-2">
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(34,197,94,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="text-sm bg-accent text-black font-semibold px-5 py-2.5 rounded-lg tracking-wide"
          >
            Start Free
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-icons" style={{fontFamily:'Material Icons'}}>
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="bg-accent text-black font-semibold py-2.5 rounded-lg">
            Start Free
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};
