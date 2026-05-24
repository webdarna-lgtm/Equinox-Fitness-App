import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CursorGlow, LoadingScreen } from './components/UI';
import { Hero } from './sections/Hero';
import { Dashboard } from './sections/Dashboard';
import { Programs } from './sections/Programs';
import { AppShowcase } from './sections/AppShowcase';
import { Trainers } from './sections/Trainers';
import { Analytics } from './sections/Analytics';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FinalCTA, Footer } from './sections/FinalCTA';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="scanline" />
      <CursorGlow />
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <div className="min-h-screen bg-bg">
          <Navbar />
          <main>
            <Hero />
            <Dashboard />
            <Programs />
            <AppShowcase />
            <Trainers />
            <Analytics />
            <Testimonials />
            <Pricing />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
