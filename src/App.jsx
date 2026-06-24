import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home as HomeIcon, Key, MapPin, Building2 } from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageContext';
import { CMSProvider } from './contexts/CMSContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import MortgageCalculator from './components/MortgageCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import PropertyModal from './components/PropertyModal';
import AdminDashboard from './components/AdminDashboard';

const Home = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: '',
    maxPrice: '',
    bedrooms: '',
    amphoe: '',
    tambon: '',
  });

  const openModal = (property) => {
    setSelectedProperty(property);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProperty(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero filters={filters} setFilters={setFilters} />
        <Showcase filters={filters} onOpenModal={openModal} setFilters={setFilters} />
        <MortgageCalculator />
        <WhyChooseUs />
      </main>
      <Footer />
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={closeModal} />
      )}
    </>
  );
};

const AnimatedBackground = () => {
  const icons = [
    // 1. Far depth (animate-3d-slow, small, high blur)
    { Icon: HomeIcon, size: 50, left: '5%', delay: '0s', duration: '34s', anim: 'animate-3d-slow', theme: 'blue' },
    { Icon: Building2, size: 55, left: '25%', delay: '4s', duration: '38s', anim: 'animate-3d-slow', theme: 'blue' },
    { Icon: MapPin, size: 45, left: '45%', delay: '8s', duration: '32s', anim: 'animate-3d-slow', theme: 'gold' },
    { Icon: Key, size: 40, left: '65%', delay: '12s', duration: '42s', anim: 'animate-3d-slow', theme: 'gold' },
    { Icon: HomeIcon, size: 50, left: '85%', delay: '6s', duration: '36s', anim: 'animate-3d-slow', theme: 'blue' },
  
    // 2. Mid depth (animate-3d-medium, medium, clear)
    { Icon: Key, size: 65, left: '15%', delay: '3s', duration: '28s', anim: 'animate-3d-medium', theme: 'gold' },
    { Icon: MapPin, size: 70, left: '35%', delay: '7s', duration: '26s', anim: 'animate-3d-medium', theme: 'gold' },
    { Icon: Building2, size: 75, left: '55%', delay: '1s', duration: '31s', anim: 'animate-3d-medium', theme: 'blue' },
    { Icon: HomeIcon, size: 65, left: '75%', delay: '9s', duration: '25s', anim: 'animate-3d-medium', theme: 'blue' },
    { Icon: Key, size: 60, left: '92%', delay: '13s', duration: '29s', anim: 'animate-3d-medium', theme: 'gold' },
  
    // 3. Close depth (animate-3d-fast, large, very 3D pop)
    { Icon: HomeIcon, size: 80, left: '10%', delay: '5s', duration: '22s', anim: 'animate-3d-fast', theme: 'blue' },
    { Icon: Building2, size: 85, left: '30%', delay: '11s', duration: '24s', anim: 'animate-3d-fast', theme: 'blue' },
    { Icon: Key, size: 75, left: '50%', delay: '2s', duration: '20s', anim: 'animate-3d-fast', theme: 'gold' },
    { Icon: MapPin, size: 80, left: '70%', delay: '14s', duration: '23s', anim: 'animate-3d-fast', theme: 'gold' },
    { Icon: HomeIcon, size: 85, left: '80%', delay: '8s', duration: '21s', anim: 'animate-3d-fast', theme: 'blue' },
  ];

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* Hidden SVG for 3D metallic wireframe gradients */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <linearGradient id="gold3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECC48E" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C5A880" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#A88B60" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="blue3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Modern fine grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70"
        style={{ 
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)', 
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)' 
        }}
      ></div>

      {/* Giant drifting luxury gradient blur blobs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[120px] animate-blob-1 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] animate-blob-2 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[20%] w-[450px] h-[450px] rounded-full bg-amber-400/10 blur-[130px] animate-blob-3 pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-sky-400/10 blur-[100px] animate-blob-1 pointer-events-none" style={{ animationDelay: '4s' }}></div>

      {/* Floating 3D Real Estate Tiles */}
      {icons.map((item, idx) => {
        const { Icon, size, left, delay, duration, anim, theme } = item;
        return (
          <div
            key={idx}
            className={`absolute ${anim} preserve-3d backface-hidden`}
            style={{
              left,
              animationDelay: delay,
              animationDuration: duration,
            }}
          >
            {/* The 3D Glass Tile wrapper */}
            <div 
              className={`
                relative preserve-3d rounded-[24px] 
                border backdrop-blur-[2px] transition-all duration-300
                flex items-center justify-center
                ${theme === 'blue' 
                  ? 'border-blue-200/40 bg-gradient-to-br from-white/40 to-blue-50/10 shadow-[0_12px_24px_rgba(59,130,246,0.04),_inset_0_1px_2px_rgba(255,255,255,0.6)]' 
                  : 'border-amber-200/40 bg-gradient-to-br from-white/40 to-amber-50/10 shadow-[0_12px_24px_rgba(197,168,128,0.04),_inset_0_1px_2px_rgba(255,255,255,0.6)]'
                }
              `}
              style={{
                width: `${size + 24}px`,
                height: `${size + 24}px`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Inner ambient glow layer inside the tile */}
              <div 
                className={`
                  absolute inset-2 rounded-[18px] opacity-10 filter blur-[3px]
                  ${theme === 'blue' ? 'bg-blue-400' : 'bg-amber-400'}
                `} 
              />
              
              {/* Floating Icon layer - offsets itself in Z direction for 3D depth */}
              <div 
                className="filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.07)]"
                style={{ 
                  transform: 'translateZ(20px)', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                <Icon 
                  size={size - 12} 
                  stroke={theme === 'blue' ? 'url(#blue3D)' : 'url(#gold3D)'}
                  strokeWidth={1.3} 
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  return (
    <CMSProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#82A8D9] via-[#4373B0] to-[#1D4375] text-gray-800 relative">
          <AnimatedBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </div>
      </LanguageProvider>
    </CMSProvider>
  );
}

export default App;
