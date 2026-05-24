import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DashboardPreviewMini } from '../components/DashboardPreviewMini';

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-accent/60"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [0.5, 1.2, 0.5] }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const MetricBadge = ({ icon, label, value, delay }: { icon: string; label: string; value: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="glass rounded-xl px-3 py-2.5 flex items-center gap-2.5 border border-white/8"
  >
    <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
      <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>{icon}</span>
    </div>
    <div>
      <div className="text-[10px] text-muted">{label}</div>
      <div className="text-xs font-semibold text-white">{value}</div>
    </div>
  </motion.div>
);

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: i * 0.15,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden grid-bg noise">
      {/* Gradient Orbs */}
      <div className="orb w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-accent/8 -top-32 -left-32" />
      <div className="orb w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-accent/5 bottom-0 right-0" />
      <div className="orb w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-500/5 top-1/2 right-1/4" />

      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} />
      ))}

      {/* Background athlete silhouette – hidden on small screens */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-end opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 600" className="w-[300px] h-[400px] lg:w-[500px] lg:h-[600px] text-accent" fill="currentColor">
          <ellipse cx="200" cy="60" rx="45" ry="55" opacity="0.6"/>
          <path d="M155 115 C140 180 120 250 100 310 L115 315 C130 260 148 192 162 130Z" opacity="0.5"/>
          <path d="M245 115 C260 180 280 250 300 310 L285 315 C270 260 252 192 238 130Z" opacity="0.5"/>
          <path d="M155 115 C165 200 165 280 155 380 L180 380 C175 280 175 200 162 115Z" opacity="0.5"/>
          <path d="M245 115 C235 200 235 280 245 380 L220 380 C225 280 225 200 238 115Z" opacity="0.5"/>
          <path d="M155 380 C145 440 140 480 135 540 L155 540 C160 480 165 440 175 380Z" opacity="0.4"/>
          <path d="M245 380 C255 440 260 480 265 540 L245 540 C240 480 235 440 225 380Z" opacity="0.4"/>
        </svg>
      </div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
          style={{ top: `${15 + i * 15}%` }}
          animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* Left – Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] sm:text-xs text-accent font-medium tracking-widest uppercase">AI-Powered Training Platform</span>
            </motion.div>

            <div className="overflow-hidden mb-4 sm:mb-6">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="font-display leading-none tracking-wider"
                style={{ fontSize: 'clamp(52px, 12vw, 120px)' }}
              >
                <span className="text-white">TRAIN</span>
                <br />
                <span className="gradient-text">BEYOND</span>
                <br />
                <span className="text-white">LIMITS.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-sm sm:text-base lg:text-lg text-muted leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0"
            >
              Premium AI-powered fitness experience designed for modern athletes who demand excellence in every rep, every set, every session.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(34,197,94,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-black font-bold px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl tracking-wide text-sm"
              >
                <span className="material-icons text-base" style={{ fontFamily: 'Material Icons' }}>bolt</span>
                Start Training
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 glass border border-white/10 text-white font-semibold px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl tracking-wide text-sm"
              >
                <span className="material-icons text-base" style={{ fontFamily: 'Material Icons' }}>play_circle</span>
                Explore Programs
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-6 sm:gap-10 justify-center lg:justify-start"
            >
              {[
                { value: '50K+', label: 'Athletes' },
                { value: '98%', label: 'Success Rate' },
                { value: '200+', label: 'Programs' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – Dashboard Preview (hidden below lg) */}
          <div className="relative hidden lg:block">
            <div className="absolute -left-10 top-10 z-20">
              <MetricBadge icon="local_fire_department" label="Calories Burned" value="2,847 kcal" delay={1.2} />
            </div>
            <div className="absolute -right-6 bottom-20 z-20">
              <MetricBadge icon="favorite" label="Avg Heart Rate" value="142 BPM" delay={1.4} />
            </div>
            <div className="absolute -right-4 top-8 z-20">
              <MetricBadge icon="emoji_events" label="Weekly Streak" value="12 Days 🔥" delay={1.6} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { delay: 0.8, duration: 0.9 },
                scale: { delay: 0.8, duration: 0.9 },
                y: { delay: 1.5, duration: 5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="glass-strong rounded-3xl p-1 border border-white/8"
              style={{ boxShadow: '0 0 80px rgba(34,197,94,0.08), 0 40px 80px rgba(0,0,0,0.5)' }}
            >
              <DashboardPreviewMini />
            </motion.div>
          </div>
        </div>

        {/* Mini dashboard preview on mobile (below hero text) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 lg:hidden"
        >
          <div className="glass-strong rounded-2xl p-1 border border-white/8 max-w-sm mx-auto"
            style={{ boxShadow: '0 0 40px rgba(34,197,94,0.06)' }}>
            <DashboardPreviewMini />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-bg to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent" />
        </motion.div>
        <span className="text-[10px] text-muted/50 tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};
