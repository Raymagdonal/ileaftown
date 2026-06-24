import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang } = useLang();
  const { translations: t } = useCMS();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!t) return null;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/60 py-3 shadow-sm' : 'bg-white/70 backdrop-blur-md py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100/50 shadow-sm text-blue-600">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <span className="font-sans text-lg font-extrabold tracking-wider text-gray-800 uppercase">
            ESTATE <span className="text-blue-600 font-bold">GALLERY</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans">
          <a href="#hero" className="text-xs uppercase transition-colors text-gray-600 hover:text-blue-600 font-medium tracking-wide">{t.nav.home[lang]}</a>
          <a href="#collection" className="text-xs uppercase transition-colors text-gray-600 hover:text-blue-600 font-medium tracking-wide">{t.nav.collection[lang]}</a>
          <a href="#contact" className="text-xs uppercase transition-colors text-gray-600 hover:text-blue-600 font-medium tracking-wide">{t.nav.contact[lang]}</a>
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-all duration-300 border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-600 rounded-full"
          >
            <Globe size={12} />
            <span>{lang === 'th' ? 'EN' : 'TH'}</span>
          </button>

          <a href="#contact" className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md">
            {lang === 'th' ? 'ลงขายฟรี / ติดต่อเรา' : 'Post Free / Contact'}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-300 text-gray-600 text-[10px] font-bold"
          >
            <Globe size={11} />
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
          <button className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white py-4 px-6 flex flex-col gap-4 border-t border-gray-100 shadow-lg">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 uppercase tracking-wider text-xs font-semibold">{t.nav.home[lang]}</a>
          <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 uppercase tracking-wider text-xs font-semibold">{t.nav.collection[lang]}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 uppercase tracking-wider text-xs font-semibold">{t.nav.contact[lang]}</a>
        </div>
      )}
    </header>
  );
};

export default Header;
