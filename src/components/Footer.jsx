import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
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
          <span className="text-[#4373B0] uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
            {lang === 'th' ? 'ช่องทางการติดต่อ' : 'Contact Channels'}
          </span>
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {t.nav.contact[lang]}
          </h3>

          <div className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full justify-center px-4 mx-auto">
            {/* Card 1: คุณกวาง */}
            <div className="flex-1 bg-[#22252a] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 shadow-xl text-left border border-gray-800 animate-in fade-in duration-500 w-full">
              {/* Left: QR Code Block */}
              <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center shrink-0 w-32 h-40 shadow-md">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://line.me/ti/p/~kwang1066" 
                  alt="LINE QR Code kwang1066" 
                  className="w-24 h-24 object-contain"
                />
                <span className="text-[10px] font-bold text-black mt-2 font-sans tracking-wide">
                  LINE: kwang1066
                </span>
              </div>

              {/* Right: Info Block */}
              <div className="flex flex-col text-center sm:text-left flex-grow">
                <span className="text-[#C5A880] text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                  {lang === 'th' ? 'ปรึกษาเส้นทาง & ฝ่ายขายโครงการ' : 'Consulting & Sales'}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mt-1.5 mb-3 tracking-wider font-sans">
                  085 553 5755
                </h4>
                <p className="text-gray-400 text-xs mb-3">
                  {lang === 'th' ? 'เจ้าหน้าที่: คุณกวาง' : 'Agent: Kwang'}
                </p>
                
                <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                  <a 
                    href="tel:0855535755"
                    className="inline-flex items-center gap-2 bg-[#00a86b] hover:bg-[#008f5a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <Phone size={13} />
                    <span>{lang === 'th' ? 'โทรทันที' : 'Call Now'}</span>
                  </a>

                  <a 
                    href="https://line.me/ti/p/~kwang1066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#06c755] hover:bg-[#05b04b] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <MessageCircle size={13} />
                    <span>{lang === 'th' ? 'แชท LINE' : 'Chat LINE'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: คุณบาส */}
            <div className="flex-1 bg-[#22252a] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 shadow-xl text-left border border-gray-800 animate-in fade-in duration-500 w-full">
              {/* Left: QR Code Block */}
              <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center shrink-0 w-32 h-40 shadow-md">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://line.me/ti/p/~0827255246" 
                  alt="LINE QR Code 0827255246" 
                  className="w-24 h-24 object-contain"
                />
                <span className="text-[10px] font-bold text-black mt-2 font-sans tracking-wide">
                  LINE: 0827255246
                </span>
              </div>

              {/* Right: Info Block */}
              <div className="flex flex-col text-center sm:text-left flex-grow">
                <span className="text-[#C5A880] text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                  {lang === 'th' ? 'ปรึกษาเส้นทาง & ฝ่ายขายโครงการ' : 'Consulting & Sales'}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mt-1.5 mb-3 tracking-wider font-sans">
                  082 725 5246
                </h4>
                <p className="text-gray-400 text-xs mb-3">
                  {lang === 'th' ? 'เจ้าหน้าที่: คุณบาส' : 'Agent: Bas'}
                </p>
                
                <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                  <a 
                    href="tel:0827255246"
                    className="inline-flex items-center gap-2 bg-[#00a86b] hover:bg-[#008f5a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <Phone size={13} />
                    <span>{lang === 'th' ? 'โทรทันที' : 'Call Now'}</span>
                  </a>

                  <a 
                    href="https://line.me/ti/p/~0827255246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#06c755] hover:bg-[#05b04b] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <MessageCircle size={13} />
                    <span>{lang === 'th' ? 'แชท LINE' : 'Chat LINE'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            className="text-gray-400 text-xs tracking-wider uppercase cursor-default select-none active:text-[#4373B0] transition-colors duration-500"
          >
            {t.footer.copyright[lang]}
          </p>
          <div className="flex gap-4 text-gray-400 text-xs tracking-wider uppercase">
            <a href="#" className="hover:text-[#4373B0] transition-colors">{t.footer.privacy[lang]}</a>
            <a href="#" className="hover:text-[#4373B0] transition-colors">{t.footer.terms[lang]}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
