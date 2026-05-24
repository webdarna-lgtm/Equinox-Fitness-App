import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const weeklyData = [
  { day: 'M', calories: 320 }, { day: 'T', calories: 450 },
  { day: 'W', calories: 280 }, { day: 'T', calories: 560 },
  { day: 'F', calories: 390 }, { day: 'S', calories: 680 },
  { day: 'S', calories: 490 },
];

const heartRateData = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  hr: 110 + Math.sin(i * 0.4) * 25 + Math.random() * 15,
}));

const Card = ({ children, className = '', delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: '0 0 30px rgba(34,197,94,0.08)' }}
      className={`glass rounded-2xl border border-white/6 p-4 sm:p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Stat = ({ icon, label, value, change, color }: any) => (
  <Card>
    <div className="flex items-start justify-between mb-3">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <span className="material-icons text-base sm:text-lg" style={{ color, fontFamily: 'Material Icons' }}>{icon}</span>
      </div>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${change > 0 ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 leading-tight">{value}</div>
    <div className="text-[10px] sm:text-xs text-muted">{label}</div>
  </Card>
);

const ActivityRingRow = ({ percent, color, label, subLabel, barColor }: any) => (
  <div className="flex items-center gap-3 sm:gap-4">
    <div className="relative flex-shrink-0" style={{ width: 52, height: 52 }}>
      {(() => {
        const size = 52, stroke = 6;
        const r = (size - stroke) / 2;
        const circ = 2 * Math.PI * r;
        const offset = circ - (percent / 100) * circ;
        return (
          <svg width={size} height={size} className="rotate-[-90deg]">
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
            <motion.circle
              cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
        );
      })()}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-xs font-semibold text-white">{label}</div>
      <div className="text-[10px] text-muted mb-1.5">{subLabel}</div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: barColor }}
          initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ delay: 0.5, duration: 1 }} />
      </div>
    </div>
    <div className="text-xs font-bold flex-shrink-0" style={{ color }}>{percent}%</div>
  </div>
);

export const Dashboard = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (

    <section id="dashboard" className="py-20 sm:py-32 relative overflow-hidden w-full" ref={ref}>

      <div className="orb w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-accent/5 top-0 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>dashboard</span>
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Performance Dashboard</span>
          </div>
          <h2 className="font-display text-white mb-3 sm:mb-4 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
            YOUR METRICS,<span className="block gradient-text">ELEVATED.</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto px-4">
            Real-time analytics and AI-driven insights to optimize every aspect of your performance.
          </p>
        </motion.div>

        {/* Stats row – 2×2 on mobile, 4 cols on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Stat icon="local_fire_department" label="Calories Burned" value="2,847" change={12} color="#f97316" />
          <Stat icon="favorite" label="Heart Rate" value="142 BPM" change={-3} color="#ef4444" />
          <Stat icon="fitness_center" label="Workouts" value="24" change={18} color="#22c55e" />
          <Stat icon="trending_up" label="Performance" value="94/100" change={7} color="#3b82f6" />
        </div>

        {/* Chart + rings – stack on mobile */}
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Weekly calories – full width on mobile */}
          <Card className="md:col-span-2" delay={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <div className="text-sm font-semibold text-white">Weekly Calories</div>
                <div className="text-xs text-muted">Mon – Sun</div>
              </div>
              <div className="flex gap-1.5">
                {['Week', 'Month'].map((t, i) => (
                  <button key={t} className={`text-xs px-3 py-1 rounded-lg ${i === 0 ? 'bg-accent text-black font-semibold' : 'glass text-muted'}`}>{t}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 11 }}
                  labelStyle={{ color: '#fff' }} itemStyle={{ color: '#22C55E' }} />
                <Area type="monotone" dataKey="calories" stroke="#22C55E" strokeWidth={2} fill="url(#calGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Activity rings */}
          <Card delay={0.15}>
            <div className="text-sm font-semibold text-white mb-0.5">Activity Rings</div>
            <div className="text-xs text-muted mb-4">Today's goals</div>
            <div className="flex flex-col gap-4">
              <ActivityRingRow percent={85} color="#22c55e" label="Move" subLabel="847 / 1000 kcal" barColor="#22c55e" />
              <ActivityRingRow percent={68} color="#3b82f6" label="Exercise" subLabel="41 / 60 min" barColor="#3b82f6" />
              <ActivityRingRow percent={92} color="#f97316" label="Stand" subLabel="11 / 12 hrs" barColor="#f97316" />
            </div>
          </Card>
        </div>

        {/* Heart rate + AI Coach */}
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
          <Card className="md:col-span-2" delay={0.2}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <div className="text-sm font-semibold text-white">Heart Rate</div>
                <div className="text-xs text-muted">Live monitoring</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-red-400">142 BPM</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <LineChart data={heartRateData}>
                <Line type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 11 }}
                  labelStyle={{ color: '#fff' }} itemStyle={{ color: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card delay={0.25}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
                <span className="material-icons text-accent text-base" style={{ fontFamily: 'Material Icons' }}>psychology</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-accent">AI COACH</div>
                <div className="text-[10px] text-muted">Personalized insights</div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { text: 'VO₂ max improved 8% this week', icon: 'trending_up', color: '#22c55e' },
                { text: "Increase tomorrow's load by 12%", icon: 'fitness_center', color: '#3b82f6' },
                { text: 'Recovery score: Excellent (94)', icon: 'bedtime', color: '#a855f7' },
              ].map((tip, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/3"
                >
                  <span className="material-icons text-sm mt-0.5 flex-shrink-0" style={{ color: tip.color, fontFamily: 'Material Icons' }}>{tip.icon}</span>
                  <span className="text-xs text-muted leading-snug">{tip.text}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
