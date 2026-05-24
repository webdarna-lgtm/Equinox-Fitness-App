import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const weekData = [
  { day: 'M', cal: 320 }, { day: 'T', cal: 450 }, { day: 'W', cal: 280 },
  { day: 'T', cal: 510 }, { day: 'F', cal: 390 }, { day: 'S', cal: 620 }, { day: 'S', cal: 480 },
];

const ActivityRing = ({ percent, color, size, stroke }: { percent: number; color: string; size: number; stroke: number }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }} />
    </svg>
  );
};

export const DashboardPreviewMini = () => {
  return (
    <div className="bg-[#0a0a0a] rounded-3xl p-4 sm:p-5 w-full">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div>
          <div className="text-[10px] text-muted mb-0.5">Today's Summary</div>
          <div className="text-xs sm:text-sm font-semibold text-white">Saturday Training</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-accent">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 sm:mb-5">
        {[
          { icon: 'local_fire_department', label: 'Calories', value: '847', unit: 'kcal', color: '#f97316' },
          { icon: 'favorite', label: 'Heart Rate', value: '142', unit: 'bpm', color: '#ef4444' },
          { icon: 'timer', label: 'Duration', value: '48', unit: 'min', color: '#22c55e' },
        ].map((m) => (
          <div key={m.label} className="glass rounded-xl p-2 sm:p-3 text-center">
            <span className="material-icons text-base sm:text-lg mb-1 block" style={{ color: m.color, fontFamily: 'Material Icons' }}>{m.icon}</span>
            <div className="text-sm sm:text-base font-bold text-white leading-none">{m.value}</div>
            <div className="text-[9px] sm:text-[10px] text-muted mt-0.5">{m.unit}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="flex-1 glass rounded-xl p-2.5 sm:p-3">
          <div className="text-[9px] sm:text-[10px] text-muted mb-1.5">Weekly Calories</div>
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="cgHero" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="cal" stroke="#22C55E" strokeWidth={1.5} fill="url(#cgHero)" dot={false} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 10 }}
                labelStyle={{ color: '#fff' }} itemStyle={{ color: '#22C55E' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
          <div className="text-[9px] sm:text-[10px] text-muted mb-1.5">Activity</div>
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="absolute inset-0"><ActivityRing percent={85} color="#22c55e" size={56} stroke={5} /></div>
            <div className="absolute inset-[6px]"><ActivityRing percent={68} color="#3b82f6" size={44} stroke={5} /></div>
            <div className="absolute inset-[12px]"><ActivityRing percent={92} color="#f97316" size={32} stroke={5} /></div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-accent/20 bg-accent/5 p-2.5 sm:p-3 flex items-start gap-2.5">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
          <span className="material-icons text-accent text-xs sm:text-sm" style={{ fontFamily: 'Material Icons' }}>psychology</span>
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-semibold text-accent mb-0.5">AI COACH</div>
          <div className="text-[9px] sm:text-[10px] text-muted leading-relaxed">Excellent! VO2 max improved 8% this week. Increase intensity by 12% tomorrow.</div>
        </div>
      </div>
    </div>
  );
};
