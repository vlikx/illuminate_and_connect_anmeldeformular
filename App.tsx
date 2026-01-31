import React, { useRef } from 'react';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import RegistrationForm from './components/RegistrationForm';
import RueckblickCarousel from './components/RueckblickCarousel';

const App: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-slate-50 selection:bg-fuchsia-500/30 font-sans">
      
      {/* Stars / Noise Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Fine Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        {/* Small Stars via radial gradients */}
        <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #fff, rgba(0,0,0,0))',
            backgroundSize: '300px 300px'
        }}></div>
      </div>

      <div className="relative z-10">
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center max-w-7xl mx-auto z-50">
           <div className="font-[Rajdhani] font-bold text-2xl tracking-wide text-white flex items-baseline">
             I<span className="text-fuchsia-500">&</span>C <span className="text-yellow-400 ml-1">.</span>
           </div>
        </nav>

        <Hero onScrollToForm={scrollToForm} />
        
        <InfoSection />
        
          <RueckblickCarousel />
           <section ref={formRef} className="py-24 px-4 relative overflow-hidden">
             {/* Background glow for form section */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-fuchsia-900/10 rounded-full blur-[100px] -z-10" />
             <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-900/5 rounded-full blur-[120px] -z-10" />
             <RegistrationForm />
           </section>

        <footer className="py-5 border-t border-white/5 bg-black relative z-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-600 text-sm mb-4">Illuminate & Connect © {new Date().getFullYear()}</p>
            {/* Footer-Links entfernt */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;