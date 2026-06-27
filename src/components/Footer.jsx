import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import lineLogo from '../assets/line-logo.svg';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';

const Footer = () => {
  const { lang } = useLang();
  const { translations: t } = useCMS();
  const navigate = useNavigate();
  const [pressTimer, setPressTimer] = useState(null);

  const startPress = () => {
    const timer = setTimeout(() => {
      navigate('/admin');
      window.scrollTo(0, 0);
    }, 3000); // 3 seconds
    setPressTimer(timer);
  };

  const endPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  if (!t) return null;

  return (
    <footer id="contact" className="bg-white/80 backdrop-blur-sm pt-20 pb-10 border-t border-gray-200/60 text-gray-600">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center mb-14">
          <span className="text-blue-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
            {lang === 'th' ? 'ช่องทางการติดต่อ' : 'Contact Channels'}
          </span>
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {t.nav.contact[lang]}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl w-full justify-center px-4">
            {/* Phone Card (Kwang) */}
            <a 
              href="tel:0855535755"
              className="bg-white border border-gray-200/60 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/5 p-5 rounded-xl flex items-center gap-4 transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex-grow">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-0.5">
                  {lang === 'th' ? 'โทรติดต่อคุณกวาง' : 'Call Agent'}
                </span>
                <span className="text-gray-800 font-bold text-sm md:text-base group-hover:text-blue-600 transition-colors block leading-tight">
                  085-553-5755
                </span>
                <span className="text-gray-400 text-xs mt-0.5 block leading-none">
                  {lang === 'th' ? '(คุณกวาง)' : '(Kwang)'}
                </span>
              </div>
            </a>

            {/* LINE Card (Kwang) */}
            <a 
              href="https://line.me/ti/p/~kwang1066"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border border-gray-200/60 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/5 p-5 rounded-xl flex items-center gap-4 transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <img
                  src={lineLogo}
                  alt="LINE"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div className="flex-grow">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-0.5">
                  {lang === 'th' ? 'แอดไลน์สอบถาม' : 'Chat via LINE'}
                </span>
                <span className="text-gray-800 font-bold text-sm md:text-base group-hover:text-green-600 transition-colors block leading-tight">
                  kwang1066
                </span>
                <span className="text-gray-400 text-xs mt-0.5 block leading-none">
                  {lang === 'th' ? 'แชทสอบถามข้อมูล' : 'Inquire for info'}
                </span>
              </div>
            </a>

            {/* Phone Card (Bas) */}
            <a 
              href="tel:0827255246"
              className="bg-white border border-gray-200/60 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/5 p-5 rounded-xl flex items-center gap-4 transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex-grow">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-0.5">
                  {lang === 'th' ? 'โทรติดต่อคุณบาส' : 'Call Agent'}
                </span>
                <span className="text-gray-800 font-bold text-sm md:text-base group-hover:text-blue-600 transition-colors block leading-tight">
                  082-725-5246
                </span>
                <span className="text-gray-400 text-xs mt-0.5 block leading-none">
                  {lang === 'th' ? '(คุณบาส)' : '(Bas)'}
                </span>
              </div>
            </a>

            {/* LINE Card (Bas) */}
            <a 
              href="https://line.me/ti/p/~0827255246"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border border-gray-200/60 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/5 p-5 rounded-xl flex items-center gap-4 transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <img
                  src={lineLogo}
                  alt="LINE"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div className="flex-grow">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-0.5">
                  {lang === 'th' ? 'แอดไลน์สอบถาม' : 'Chat via LINE'}
                </span>
                <span className="text-gray-800 font-bold text-sm md:text-base group-hover:text-green-600 transition-colors block leading-tight">
                  0827255246
                </span>
                <span className="text-gray-400 text-xs mt-0.5 block leading-none">
                  {lang === 'th' ? 'แชทสอบถามข้อมูล' : 'Inquire for info'}
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            className="text-gray-400 text-xs tracking-wider uppercase cursor-default select-none active:text-blue-600 transition-colors duration-500"
          >
            {t.footer.copyright[lang]}
          </p>
          <div className="flex gap-4 text-gray-400 text-xs tracking-wider uppercase">
            <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.privacy[lang]}</a>
            <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.terms[lang]}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
