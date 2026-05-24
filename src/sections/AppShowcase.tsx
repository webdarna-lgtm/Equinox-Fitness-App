import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const weekData = [
  { cal: 320 }, { cal: 450 }, { cal: 280 }, { cal: 510 }, { cal: 390 }, { cal: 620 }, { cal: 480 },
];

const Screen1 = () => (
  <div className="p-4 pt-10 h-full flex flex-col bg-[#050505]">
    <div className="text-[9px] text-muted mb-0.5">Good Morning, Alex</div>
    <div className="text-sm font-bold text-white mb-3">Today's Training</div>
    <div className="glass rounded-xl p-3 mb-3 border border-accent/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center">
          <span className="material-icons text-accent text-xs" style={{ fontFamily: 'Material Icons' }}>fitness_center</span>
        </div>
        <div>
          <div className="text-xs font-semibold text-white">Upper Body Power</div>
          <div className="text-[8px] text-muted">6 exercises • 52 min</div>
        </div>
      </div>
      <div className="h-1 bg-white/5 rounded-full mb-1">
        <div className="h-full w-2/3 bg-accent rounded-full" />
      </div>
      <div className="text-[8px] text-muted">67% Complete</div>
    </div>
    <div className="grid grid-cols-3 gap-1.5 mb-3">
      {[['320', 'cal'], ['142', 'bpm'], ['38', 'min']].map(([v, u], i) => (
        <div key={i} className="glass rounded-lg p-2 text-center border border-white/5">
          <div className="text-xs font-bold text-white">{v}</div>
          <div className="text-[7px] text-muted">{u}</div>
        </div>
      ))}
    </div>
    <div className="mt-auto">
      <button className="w-full py-2 bg-accent rounded-lg text-black text-xs font-bold">Continue →</button>
    </div>
  </div>
);

const Screen2 = () => (
  <div className="p-4 pt-10 h-full flex flex-col bg-[#050505]">
    <div className="text-[9px] text-muted mb-0.5">Weekly Progress</div>
    <div className="text-sm font-bold text-white mb-3">Calories</div>
    <div className="glass rounded-xl p-3 mb-3 border border-white/5">
      <ResponsiveContainer width="100%" height={80}>
        <AreaChart data={weekData}>
          <defs>
            <linearGradient id="appG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="cal" stroke="#22C55E" strokeWidth={1.5} fill="url(#appG)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    {[
      { icon: 'psychology', color: '#22c55e', text: 'Increase volume +15%' },
      { icon: 'bedtime', color: '#3b82f6', text: 'Sleep quality: Optimal' },
      { icon: 'restaurant', color: '#f97316', text: 'Protein: 180g needed' },
    ].map((item, i) => (
      <div key={i} className="flex items-center gap-2 glass rounded-lg p-2.5 mb-2 border border-white/5">
        <span className="material-icons text-xs flex-shrink-0" style={{ color: item.color, fontFamily: 'Material Icons' }}>{item.icon}</span>
        <span className="text-[9px] text-muted">{item.text}</span>
      </div>
    ))}
  </div>
);

export const AppShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (

    <section className="py-20 sm:py-32 relative overflow-hidden w-full" ref={ref}>

      <div className="orb w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left – Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>phone_iphone</span>
              <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Mobile App</span>
            </div>
            <h2 className="font-display text-white mb-4 sm:mb-6 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
              TRAIN<br /><span className="gradient-text">ANYWHERE.</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
              Your entire fitness ecosystem in your pocket. Real-time coaching, AI-driven insights, and seamless tracking.
            </p>
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-left">
              {[
                { icon: 'offline_bolt', label: 'Works Offline', desc: 'Full access to workouts, even without connection' },
                { icon: 'watch', label: 'Wearable Sync', desc: 'Apple Watch & Garmin integration' },
                { icon: 'notifications_active', label: 'Smart Reminders', desc: 'AI-timed notifications based on your schedule' },
              ].map((f) => (
                <div key={f.label} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-accent text-base" style={{ fontFamily: 'Material Icons' }}>{f.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.label}</div>
                    <div className="text-xs text-muted">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center lg:justify-start">
              {[
                { icon: 'apple', label: 'App Store' },
                { icon: 'android', label: 'Google Play' },
              ].map((btn) => (
                <motion.button key={btn.label} whileHover={{ scale: 1.03 }}
                  className="flex-1 sm:flex-none glass border border-white/10 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white">
                  <span className="material-icons text-base" style={{ fontFamily: 'Material Icons' }}>{btn.icon}</span>
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right – Phone mockups */}
          <div className="relative h-[360px] sm:h-[440px] flex items-center justify-center">
            {/* Left phone */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={inView ? { opacity: 1, y: 0, rotate: -8 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute"
              style={{ left: '5%', zIndex: 10 }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                <div className="w-[140px] sm:w-[170px] rounded-[28px] overflow-hidden relative"
                  style={{ height: 300, background: 'linear-gradient(135deg,#1a1a1a,#0d0d0d)', boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10" />
                  <div className="absolute inset-[2px] rounded-[26px] overflow-hidden"><Screen1 /></div>
                  <div className="absolute inset-0 rounded-[28px]" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%)' }} />
                </div>
              </motion.div>
            </motion.div>

            {/* Center phone */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: -20 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              style={{ zIndex: 20, position: 'relative' }}
            >
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="w-[160px] sm:w-[200px] rounded-[32px] overflow-hidden relative"
                  style={{ height: 340, background: 'linear-gradient(135deg,#1a1a1a,#0d0d0d)', boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), 0 0 40px rgba(34,197,94,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)' }}>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                  <div className="absolute inset-[2px] rounded-[30px] overflow-hidden"><Screen2 /></div>
                  <div className="absolute inset-0 rounded-[32px]" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 50%)' }} />
                </div>
              </motion.div>
            </motion.div>

            {/* Right phone */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 5 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 8 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute"
              style={{ right: '5%', zIndex: 10 }}
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                <div className="w-[140px] sm:w-[170px] rounded-[28px] overflow-hidden relative"
                  style={{ height: 300, background: 'linear-gradient(135deg,#1a1a1a,#0d0d0d)', boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10" />
                  <div className="absolute inset-[2px] rounded-[26px] overflow-hidden"><Screen1 /></div>
                  <div className="absolute inset-0 rounded-[28px]" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%)' }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
