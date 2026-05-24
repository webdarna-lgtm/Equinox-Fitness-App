import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const plans = [
  {
    name: 'Starter', price: { monthly: 19, annual: 15 },
    description: 'Perfect for athletes starting their transformation',
    color: '#A1A1AA',
    features: ['Access to 50+ programs', 'Basic performance tracking', 'Nutrition logging', 'Community forum', 'Mobile app access'],
    missing: ['AI coaching', 'Advanced analytics', '1-on-1 sessions'],
  },
  {
    name: 'Pro Athlete', price: { monthly: 49, annual: 39 },
    description: 'The complete toolkit for serious athletes',
    color: '#22c55e', popular: true,
    features: ['Unlimited programs', 'Real-time AI coaching', 'Advanced analytics', 'Wearable device sync', 'Custom program builder', 'Priority support', 'Live group classes'],
    missing: ['Unlimited 1-on-1 sessions'],
  },
  {
    name: 'Elite', price: { monthly: 99, annual: 79 },
    description: 'White-glove service for elite athletes',
    color: '#eab308',
    features: ['Everything in Pro', 'Dedicated personal trainer', 'Unlimited 1-on-1 sessions', 'Custom meal plans', 'Sports psychologist', 'Biometric analysis', 'Concierge support 24/7'],
    missing: [],
  },
];

export const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [annual, setAnnual] = useState(false);

  return (

    <section id="pricing" className="py-20 sm:py-32 relative overflow-hidden w-full" ref={ref}>

      <div className="orb w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-accent/5 top-0 left-1/2 -translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm" style={{ fontFamily: 'Material Icons' }}>workspace_premium</span>
            <span className="text-[10px] sm:text-xs text-accent tracking-widest uppercase font-medium">Pricing</span>
          </div>
          <h2 className="font-display text-white mb-3 sm:mb-4 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}>
            INVEST IN<span className="block gradient-text">YOUR POTENTIAL.</span>
          </h2>
          <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto px-4 mb-6 sm:mb-8">
            All plans include a 14-day free trial. No credit card required.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className={`text-xs sm:text-sm ${!annual ? 'text-white' : 'text-muted'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${annual ? 'bg-accent' : 'bg-white/10'}`}>
              <motion.div animate={{ x: annual ? 23 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full absolute top-0.5" />
            </button>
            <span className={`text-xs sm:text-sm ${annual ? 'text-white' : 'text-muted'}`}>
              Annual <span className="text-accent font-semibold ml-1">–20%</span>
            </span>
          </div>
        </motion.div>

        {/* 1 col mobile, 3 cols on lg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`relative glass rounded-2xl p-6 sm:p-7 overflow-hidden ${plan.popular ? 'border border-accent/30' : 'border border-white/6'}`}
              style={{ boxShadow: plan.popular ? '0 0 60px rgba(34,197,94,0.12)' : 'none' }}>

              {plan.popular && (
                <>
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] sm:text-xs bg-accent text-black font-bold px-2.5 py-1 rounded-full">POPULAR</span>
                  </div>
                </>
              )}

              <div className="mb-5 sm:mb-6 pr-16">
                <div className="text-[10px] sm:text-xs tracking-widest mb-2" style={{ color: plan.color }}>{plan.name.toUpperCase()}</div>
                <div className="flex items-end gap-1.5 mb-1.5">
                  <span className="text-3xl sm:text-4xl font-bold text-white">${annual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="text-muted text-xs pb-1">/mo</span>
                </div>
                {annual && (
                  <div className="text-xs text-accent">${(plan.price.monthly - plan.price.annual) * 12} saved annually</div>
                )}
                <p className="text-xs text-muted mt-2">{plan.description}</p>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold mb-5 sm:mb-6 transition-all duration-300"
                style={{
                  background: plan.popular ? '#22c55e' : `${plan.color}15`,
                  color: plan.popular ? '#000' : plan.color,
                  border: `1px solid ${plan.color}30`,
                  boxShadow: plan.popular ? '0 0 20px rgba(34,197,94,0.3)' : 'none',
                }}>
                Start Free Trial
              </motion.button>

              <div className="space-y-2.5 sm:space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="material-icons text-sm mt-0.5 flex-shrink-0" style={{ color: plan.color, fontFamily: 'Material Icons' }}>check_circle</span>
                    <span className="text-xs text-muted leading-snug">{f}</span>
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-start gap-2 opacity-30">
                    <span className="material-icons text-sm mt-0.5 flex-shrink-0 text-muted" style={{ fontFamily: 'Material Icons' }}>remove_circle_outline</span>
                    <span className="text-xs text-muted line-through leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
