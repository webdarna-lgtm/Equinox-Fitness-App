import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const trainers = [
  { name: 'Marcus Chen', title: 'Strength & Power Specialist', specialty: 'Powerlifting • Olympic Lifting', rating: 4.9, clients: 847, years: 12, color: '#22c55e', initials: 'MC', bio: 'Former Olympic athlete. Helped 800+ athletes achieve competition-level strength.' },
  { name: 'Sofia Reyes', title: 'Athletic Performance Coach', specialty: 'HIIT • Sports Conditioning', rating: 4.8, clients: 1240, years: 9, color: '#3b82f6', initials: 'SR', bio: 'Ex-professional sprinter, NSCA-CSCS. Specializes in explosive athletic development.' },
  { name: 'James Wright', title: 'Elite Physique Coach', specialty: 'Hypertrophy • Body Composition', rating: 5.0, clients: 623, years: 15, color: '#f97316', initials: 'JW', bio: 'IFBB Pro Bodybuilder with 15 years coaching athletes to stage-ready condition.' },
  { name: 'Aisha Okafor', title: 'Functional Movement Expert', specialty: 'Mobility • Recovery • Yoga', rating: 4.9, clients: 975, years: 8, color: '#a855f7', initials: 'AO', bio: 'Movement therapist and FRC practitioner. Helps athletes unlock performance.' },
];

const TrainerCard = ({ trainer, index }: { trainer: typeof trainers[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass rounded-2xl border border-white/6 p-5 sm:p-6 overflow-hidden cursor-pointer"
      style={{ boxShadow: hovered ? `0 0 40px ${trainer.color}12` : 'none', transition: 'box-shadow 0.4s' }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${trainer.color}, transparent)` }}
        initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} />

      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0 relative overflow-hidden"
          style={{ background: `${trainer.color}20`, border: `1px solid ${trainer.color}30` }}>
          <span style={{ color: trainer.color }}>{trainer.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-white mb-0.5 truncate">{trainer.name}</h3>
          <p className="text-[10px] sm:text-xs text-muted mb-1 leading-snug">{trainer.title}</p>
          <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full truncate max-w-full" style={{ background: `${trainer.color}15`, color: trainer.color }}>
            {trainer.specialty}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted leading-relaxed mb-4 sm:mb-5">{trainer.bio}</p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
        {[
          { label: 'Rating', value: trainer.rating.toString(), icon: 'star' },
          { label: 'Clients', value: trainer.clients > 999 ? `${(trainer.clients / 1000).toFixed(1)}K` : trainer.clients.toString(), icon: 'people' },
          { label: 'Years', value: `${trainer.years}+`, icon: 'workspace_premium' },
        ].map((s) => (
          <div key={s.label} className="text-center glass rounded-xl p-2 sm:p-2.5 border border-white/5">
            <span className="material-icons text-xs block mb-1" style={{ color: trainer.color, fontFamily: 'Material Icons' }}>{s.icon}</span>
            <div className="text-sm sm:text-base font-bold text-white leading-none">{s.value}</div>
            <div className="text-[8px] sm:text-[9px] text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <motion.button whileHover={{ scale: 1.02 }}
        className="w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300"
        style={{ background: hovered ? trainer.color : `${trainer.color}12`, color: hovered ? '#000' : trainer.color, border: `1px solid ${trainer.color}25` }}>
        Book Session
      </motion.button>
    </motion.div>
  );
};

export const Trainers = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (

    <section id="trainers" className="py-20 sm:py-32 relative overflow-hidden w-full" ref={ref}>

      <div className="orb w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-accent/5 top-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>groups</span>
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Elite Trainers</span>
          </div>
          <h2 className="font-display text-white mb-3 sm:mb-4 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
            COACHED BY<span className="block gradient-text">THE BEST.</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto px-4">Our roster of world-class coaches has trained Olympic athletes and elite performers.</p>
        </motion.div>

        {/* 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {trainers.map((t, i) => <TrainerCard key={t.name} trainer={t} index={i} />)}
        </div>
      </div>
    </section>
  );
};
