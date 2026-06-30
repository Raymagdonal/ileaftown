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
          <span className="text-blue-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
            {lang === 'th' ? 'ช่องทางการติดต่อ' : 'Contact Channels'}
          </span>
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {t.nav.contact[lang]}
          </h3>

          <div className="bg-[#22252a] rounded-2xl p-6 sm:p-8 max-w-2xl w-full mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 shadow-xl text-left border border-gray-800 animate-in fade-in duration-500">
            {/* Left: QR Code Block */}
            <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center shrink-0 w-36 h-44 shadow-md">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://line.me/R/ti/p/%40akad" 
                alt="LINE QR Code @akad" 
                className="w-28 h-28 object-contain"
              />
              <span className="text-[11px] font-bold text-black mt-2 font-sans tracking-wide">
                LINE: @akad
              </span>
            </div>

            {/* Right: Info Block */}
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-[#C5A880] text-xs sm:text-sm font-semibold tracking-wide uppercase">
                {lang === 'th' ? 'ปรึกษาเส้นทาง & ฝ่ายขายโครงการ' : 'Consulting & Sales Department'}
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4 tracking-wider font-sans">
                087 666 2282
              </h4>
              
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {/* Call Button */}
                <a 
                  href="tel:0876662282"
                  className="inline-flex items-center gap-2 bg-[#00a86b] hover:bg-[#008f5a] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-md"
                >
                  <Phone size={14} />
                  <span>{lang === 'th' ? 'โทรทันที' : 'Call Now'}</span>
                </a>

                {/* LINE Chat Button */}
                <a 
                  href="https://line.me/R/ti/p/%40akad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#06c755] hover:bg-[#05b04b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>{lang === 'th' ? 'แชท LINE' : 'Chat LINE'}</span>
                </a>
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
