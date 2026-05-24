import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', strength: 65, endurance: 58, recovery: 72 },
  { month: 'Feb', strength: 68, endurance: 62, recovery: 74 },
  { month: 'Mar', strength: 72, endurance: 67, recovery: 71 },
  { month: 'Apr', strength: 75, endurance: 70, recovery: 78 },
  { month: 'May', strength: 79, endurance: 73, recovery: 80 },
  { month: 'Jun', strength: 82, endurance: 77, recovery: 82 },
  { month: 'Jul', strength: 86, endurance: 81, recovery: 85 },
  { month: 'Aug', strength: 88, endurance: 84, recovery: 88 },
];

const weeklyVolume = [
  { week: 'W1', sets: 84, reps: 940 },
  { week: 'W2', sets: 92, reps: 1040 },
  { week: 'W3', sets: 78, reps: 880 },
  { week: 'W4', sets: 108, reps: 1200 },
];

const workoutBreakdown = [
  { name: 'Strength', value: 38, color: '#22c55e' },
  { name: 'Cardio', value: 25, color: '#3b82f6' },
  { name: 'HIIT', value: 22, color: '#f97316' },
  { name: 'Mobility', value: 15, color: '#a855f7' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong border border-white/10 rounded-xl p-3 text-xs">
      <div className="text-white font-semibold mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted">{p.name}:</span>
          <span className="text-white font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const Analytics = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState<'performance' | 'volume' | 'distribution'>('performance');

  return (

  <section id="analytics" className="py-20 sm:py-32 relative overflow-hidden w-full" ref={ref}>
      <div className="orb w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-500/5 bottom-0 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>analytics</span>
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Deep Analytics</span>
          </div>
          <h2 className="font-display text-white mb-3 sm:mb-4 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
            DATA-DRIVEN<span className="block gradient-text">EXCELLENCE.</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto px-4">Advanced analytics that help you understand every dimension of your training.</p>
        </motion.div>

        {/* Tabs – scrollable on mobile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-10">
          <div className="glass border border-white/8 rounded-xl p-1 flex gap-1">
            {(['performance', 'volume', 'distribution'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 capitalize ${activeTab === tab ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="glass rounded-2xl sm:rounded-3xl border border-white/6 p-4 sm:p-6 lg:p-8">

          {activeTab === 'performance' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
                <div>
                  <h3 className="text-white font-semibold">Performance Metrics</h3>
                  <p className="text-muted text-xs sm:text-sm">8-month progression</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[{ label: 'Strength', color: '#22c55e' }, { label: 'Endurance', color: '#3b82f6' }, { label: 'Recovery', color: '#a855f7' }].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                      <span className="text-xs text-muted">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={monthlyData}>
                  <defs>
                    {[['sg', '#22c55e'], ['eg', '#3b82f6'], ['rg', '#a855f7']].map(([id, color]) => (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="strength" stroke="#22c55e" strokeWidth={2} fill="url(#sg)" name="Strength" />
                  <Area type="monotone" dataKey="endurance" stroke="#3b82f6" strokeWidth={2} fill="url(#eg)" name="Endurance" />
                  <Area type="monotone" dataKey="recovery" stroke="#a855f7" strokeWidth={2} fill="url(#rg)" name="Recovery" />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}

          {activeTab === 'volume' && (
            <>
              <div className="mb-5 sm:mb-6">
                <h3 className="text-white font-semibold">Training Volume</h3>
                <p className="text-muted text-xs sm:text-sm">Monthly breakdown by week</p>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={weeklyVolume} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="week" tick={{ fill: '#A1A1AA', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#A1A1AA', fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sets" fill="#22c55e" radius={[4, 4, 0, 0]} name="Sets" />
                  <Bar dataKey="reps" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Reps" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {activeTab === 'distribution' && (
            <>
              <div className="mb-5 sm:mb-6">
                <h3 className="text-white font-semibold">Workout Distribution</h3>
                <p className="text-muted text-xs sm:text-sm">Training type breakdown</p>
              </div>
              {/* Stack on mobile, row on md+ */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={workoutBreakdown} layout="vertical" barSize={22}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                      <XAxis type="number" tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#A1A1AA', fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
                      <Tooltip content={<CustomTooltip />} />
                      {workoutBreakdown.map((entry) => (
                        <Bar key={entry.name} dataKey="value" name="%" radius={[0, 4, 4, 0]} fill={entry.color} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3 md:w-52 flex-shrink-0 w-full">
                  {workoutBreakdown.map((item) => (
                    <div key={item.name} className="glass rounded-xl p-3 sm:p-4 border border-white/5">
                      <div className="w-3 h-3 rounded-full mb-2 sm:mb-3" style={{ background: item.color }} />
                      <div className="text-lg sm:text-xl font-bold text-white">{item.value}%</div>
                      <div className="text-[10px] sm:text-xs text-muted">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};
