import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-28 sm:py-40 relative overflow-hidden" ref={ref}>
      <div className="orb w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-accent/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      {[...Array(3)].map((_, i) => (
        <motion.div key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/8"
          style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px` }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Join 50,000+ Athletes</span>
          </div>
          <h2 className="font-display text-white mb-5 sm:mb-6 leading-none tracking-wider" style={{ fontSize: 'clamp(40px, 10vw, 120px)' }}>
            BECOME THE<br /><span className="gradient-text">STRONGEST</span><br />VERSION OF<br />YOURSELF.
          </h2>
          <p className="text-muted text-sm sm:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 font-light leading-relaxed px-4">
            The elite training platform used by professional athletes, olympians, and high performers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(34,197,94,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-accent text-black font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-sm sm:text-base tracking-wide">
              <span className="material-icons" style={{ fontFamily: 'Material Icons' }}>bolt</span>
              Join Equinox
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 glass border border-white/12 text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-sm sm:text-base">
              <span className="material-icons" style={{ fontFamily: 'Material Icons' }}>play_circle</span>
              Start Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand – full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="material-icons text-black text-lg" style={{ fontFamily: 'Material Icons' }}>bolt</span>
              </div>
              <span className="font-display text-2xl tracking-wider text-white">EQUINOX</span>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-4">
              The world's most advanced AI-powered fitness platform, engineered for elite athletic performance.
            </p>
            <div className="flex gap-2.5">
              {['T', 'I', 'Y', 'L'].map((s) => (
                <motion.button key={s} whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 glass rounded-lg border border-white/6 flex items-center justify-center text-muted text-xs font-bold hover:text-accent transition-colors">
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Product', links: ['Features', 'Programs', 'Mobile App', 'AI Coach', 'Analytics'] },
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Blog', 'Contact'] },
            { title: 'Support', links: ['Help Center', 'Community', 'Privacy', 'Terms', 'Status'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] sm:text-xs font-semibold text-white tracking-widest uppercase mb-4">{col.title}</div>
              <div className="space-y-2.5">
                {col.links.map((link) => (
                  <div key={link}>
                    <a href="#" className="text-xs text-muted hover:text-white transition-colors">{link}</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar – stack on mobile */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs text-muted">© 2025 Equinox Fitness. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted">All systems operational</span>
          </div>
          <div className="flex gap-2.5">
            {[{ icon: 'apple', label: 'App Store' }, { icon: 'android', label: 'Google Play' }].map((btn) => (
              <motion.button key={btn.label} whileHover={{ scale: 1.02 }}
                className="flex items-center gap-1.5 glass border border-white/6 px-3 py-1.5 rounded-lg text-xs text-muted">
                <span className="material-icons text-xs" style={{ fontFamily: 'Material Icons' }}>{btn.icon}</span>
                {btn.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
