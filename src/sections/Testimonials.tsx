import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const testimonials = [
  { name: 'Alex Thompson', role: 'Professional Cyclist', text: "Equinox completely transformed my training. The AI coaching caught performance plateaus I didn't even know I had. My VO₂ max went up 14% in 3 months.", rating: 5, initials: 'AT', color: '#22c55e', stat: '+14% VO₂ Max' },
  { name: 'Sarah Mitchell', role: 'Marathon Runner', text: "The analytics dashboard is unlike anything I've used before. I can see exactly how my body responds to different training loads. Cut 18 minutes off my marathon PR.", rating: 5, initials: 'SM', color: '#3b82f6', stat: '-18min PR' },
  { name: 'Jordan Rivera', role: 'Competitive Bodybuilder', text: "Coming into competition season, Equinox's body composition tracking was invaluable. Dropped to 4.2% body fat while maintaining almost all my muscle mass.", rating: 5, initials: 'JR', color: '#f97316', stat: '4.2% Body Fat' },
  { name: 'Emma Nakashima', role: 'CrossFit Athlete', text: "The mobility programs alone are worth the subscription. My squat depth and overhead movement have dramatically improved. Haven't had an injury since.", rating: 5, initials: 'EN', color: '#a855f7', stat: '0 Injuries' },
  { name: 'David Osei', role: 'NFL Training Camp', text: "I used Equinox to prep for NFL combine training. The strength programming is elite-level. My 40-yard dash dropped from 4.6 to 4.38.", rating: 5, initials: 'DO', color: '#eab308', stat: '4.38 40-yard' },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
      <div className="orb w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-accent/5 top-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>format_quote</span>
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Athlete Stories</span>
          </div>
          <h2 className="font-display text-white mb-3 sm:mb-4 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
            RESULTS THAT<span className="block gradient-text">SPEAK.</span>
          </h2>
        </motion.div>

        {/* Featured */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-2xl sm:rounded-3xl border border-white/8 p-6 sm:p-10 mb-6 sm:mb-8 relative overflow-hidden"
            style={{ boxShadow: `0 0 60px ${t.color}08` }}
          >
            <div className="absolute top-4 right-5 font-display text-[80px] sm:text-[120px] leading-none opacity-5 pointer-events-none select-none"
              style={{ color: t.color }}>"</div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
              <div className="flex-shrink-0 flex sm:block items-center gap-4">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold"
                  style={{ background: `${t.color}20`, border: `1px solid ${t.color}30`, width: 64, height: 64 }}>
                  <span style={{ color: t.color }}>{t.initials}</span>
                </div>
                <div className="sm:hidden">
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-icons text-sm text-yellow-400" style={{ fontFamily: 'Material Icons' }}>star</span>
                  ))}
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed mb-4 sm:mb-5 font-light">"{t.text}"</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="hidden sm:block">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-muted">{t.role}</div>
                  </div>
                  <div className="inline-flex px-4 py-2 rounded-xl font-bold text-sm self-start sm:self-auto"
                    style={{ background: `${t.color}15`, color: t.color }}>
                    {t.stat}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Avatars nav – scrollable on mobile */}
        <div className="flex gap-3 justify-center flex-wrap">
          {testimonials.map((item, i) => (
            <motion.button key={item.name} onClick={() => setActive(i)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2.5 glass rounded-xl px-3 py-2.5 border transition-all duration-300 ${i === active ? 'border-accent/40' : 'border-white/6'}`}
              style={{ boxShadow: i === active ? `0 0 20px ${item.color}20` : 'none' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${item.color}20`, color: item.color }}>{item.initials}</div>
              <div className="text-left hidden xs:block">
                <div className="text-xs font-semibold text-white">{item.name.split(' ')[0]}</div>
              </div>
              {i === active && <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
