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
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-[#EBE5DA]/60 py-3 shadow-md shadow-gray-200/5' : 'bg-white/80 backdrop-blur-md py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#EBE5DA] shadow-sm text-[#4373B0]">
            <Sparkles size={16} className="animate-pulse" />
          </div>
          <span className="font-display text-lg tracking-[0.15em] font-light text-gray-800 uppercase">
            ESTATE <span className="text-[#4373B0] font-bold">GALLERY</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans">
          <a href="#hero" className="text-xs uppercase transition-colors text-gray-500 hover:text-[#4373B0] font-bold tracking-widest">{t.nav.home[lang]}</a>
          <a href="#collection" className="text-xs uppercase transition-colors text-gray-500 hover:text-[#4373B0] font-bold tracking-widest">{t.nav.collection[lang]}</a>
          <a href="#contact" className="text-xs uppercase transition-colors text-gray-500 hover:text-[#4373B0] font-bold tracking-widest">{t.nav.contact[lang]}</a>
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border border-gray-200 text-gray-400 hover:border-[#4373B0] hover:text-[#4373B0] rounded-full"
          >
            <Globe size={11} />
            <span>{lang === 'th' ? 'EN' : 'TH'}</span>
          </button>

          <a href="#contact" className="bg-gradient-to-r from-[#4373B0] to-[#1D4375] hover:from-[#1D4375] hover:to-[#122754] text-white px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-blue-900/10 hover:shadow-lg">
            {lang === 'th' ? 'ลงขายฟรี / ติดต่อเรา' : 'Post Free / Contact'}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 text-[10px] font-bold tracking-widest"
          >
            <Globe size={11} />
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
          <button className="text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md py-5 px-6 flex flex-col gap-4 border-t border-[#EBE5DA]/60 shadow-xl">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-[#4373B0] uppercase tracking-widest text-[10px] font-bold">{t.nav.home[lang]}</a>
          <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-[#4373B0] uppercase tracking-widest text-[10px] font-bold">{t.nav.collection[lang]}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-[#4373B0] uppercase tracking-widest text-[10px] font-bold">{t.nav.contact[lang]}</a>
        </div>
      )}
    </header>
  );
};

export default Header;
