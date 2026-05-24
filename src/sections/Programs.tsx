import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const programs = [
  { icon: 'fitness_center', title: 'Strength', subtitle: 'Power & Mass', description: 'Build raw strength with progressive overload protocols designed by elite powerlifters.', duration: '12 Weeks', level: 'Advanced', color: '#22c55e', sessions: 48 },
  { icon: 'local_fire_department', title: 'Fat Loss', subtitle: 'Shred Protocol', description: 'Metabolic conditioning engineered to maximize fat oxidation while preserving lean muscle.', duration: '8 Weeks', level: 'Intermediate', color: '#f97316', sessions: 32 },
  { icon: 'directions_run', title: 'Cardio', subtitle: 'Endurance Elite', description: 'Heart-rate-zone training to boost VO₂ max, improve cardiovascular efficiency and endurance.', duration: '10 Weeks', level: 'All Levels', color: '#3b82f6', sessions: 40 },
  { icon: 'self_improvement', title: 'Mobility', subtitle: 'Flow & Flex', description: 'Targeted flexibility protocols to unlock full range of motion and prevent injury.', duration: '6 Weeks', level: 'Beginner', color: '#a855f7', sessions: 24 },
  { icon: 'emoji_events', title: 'Athlete Performance', subtitle: 'Elite Edge', description: 'Comprehensive athletic development combining power, speed, agility, and sport-specific conditioning.', duration: '16 Weeks', level: 'Elite', color: '#eab308', sessions: 64 },
];

const ProgramCard = ({ program, index }: { program: typeof programs[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass rounded-2xl border border-white/6 p-5 sm:p-6 overflow-hidden cursor-pointer group"
      style={{ boxShadow: hovered ? `0 0 40px ${program.color}15, 0 0 0 1px ${program.color}25` : 'none', transition: 'box-shadow 0.4s ease' }}
    >
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${program.color}08, transparent 70%)` }} />
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10"
        style={{ background: `radial-gradient(circle at top right, ${program.color}, transparent)` }} />

      <div className="relative mb-4 sm:mb-5">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${program.color}15`, border: `1px solid ${program.color}30` }}>
          <span className="material-icons text-lg sm:text-xl" style={{ color: program.color, fontFamily: 'Material Icons' }}>{program.icon}</span>
        </div>
      </div>

      <div className="relative">
        <div className="text-[10px] sm:text-xs tracking-widest mb-1" style={{ color: program.color }}>{program.subtitle.toUpperCase()}</div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{program.title}</h3>
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4 sm:mb-5">{program.description}</p>
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
          <span className="text-[10px] sm:text-xs glass px-2.5 py-1 rounded-full text-muted border border-white/6 flex items-center gap-1">
            <span className="material-icons text-xs" style={{ fontFamily: 'Material Icons' }}>schedule</span>{program.duration}
          </span>
          <span className="text-[10px] sm:text-xs glass px-2.5 py-1 rounded-full text-muted border border-white/6 flex items-center gap-1">
            <span className="material-icons text-xs" style={{ fontFamily: 'Material Icons' }}>signal_cellular_alt</span>{program.level}
          </span>
          <span className="text-[10px] sm:text-xs text-muted">{program.sessions} sessions</span>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: hovered ? program.color : `${program.color}15`, color: hovered ? '#000' : program.color, border: `1px solid ${program.color}30` }}>
          Start Program
          <span className="material-icons text-sm" style={{ fontFamily: 'Material Icons' }}>arrow_forward</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export const Programs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (

    <section id="programs" className="py-20 sm:py-32 relative overflow-hidden w-full" ref={ref}>

      <div className="orb w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-500/5 bottom-0 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>fitness_center</span>
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Training Programs</span>
          </div>
          <h2 className="font-display text-white mb-3 sm:mb-4 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
            PROGRAMS FOR<span className="block gradient-text">EVERY ATHLETE.</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto px-4">Five elite training methodologies, meticulously designed to transform your physique.</p>
        </motion.div>

        {/* 1 col on xs, 2 on sm, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {programs.map((p, i) => <ProgramCard key={p.title} program={p} index={i} />)}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="glass rounded-2xl border border-accent/20 p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer group min-h-[220px]"
            whileHover={{ boxShadow: '0 0 40px rgba(34,197,94,0.12)' }}
          >
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-accent/30 flex items-center justify-center group-hover:border-accent/60 transition-colors">
              <span className="material-icons text-accent text-2xl" style={{ fontFamily: 'Material Icons' }}>add</span>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Build Custom Plan</div>
              <div className="text-xs text-muted">AI-tailored to your specific goals</div>
            </div>
            <button className="text-xs text-accent border border-accent/30 px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors">Create with AI →</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
