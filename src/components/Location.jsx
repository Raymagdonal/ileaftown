import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Stethoscope, MapPin, X, ZoomIn, Navigation } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';

const Location = () => {
  const { lang } = useLang();
  const { translations: t } = useCMS();
  const [isZoomed, setIsZoomed] = useState(false);

  if (!t || !t.location) return null;

  const categories = [
    {
      icon: <ShoppingBag className="text-[#F26522]" size={20} />,
      title: t.location.shopping.title[lang],
      items: t.location.shopping.list[lang]
    },
    {
      icon: <BookOpen className="text-[#F26522]" size={20} />,
      title: t.location.education.title[lang],
      items: t.location.education.list[lang]
    },
    {
      icon: <Stethoscope className="text-[#F26522]" size={20} />,
      title: t.location.healthcare.title[lang],
      items: t.location.healthcare.list[lang]
    },
    {
      icon: <Navigation className="text-[#F26522]" size={20} />,
      title: t.location.connectivity.title[lang],
      items: t.location.connectivity.list[lang]
    }
  ];

  return (
    <section id="location" className="py-20 bg-gray-50 text-gray-800 relative overflow-hidden font-sans border-t border-gray-200">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left: Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-[#F26522] uppercase tracking-wider text-xs font-bold mb-3">
              <MapPin size={14} />
              <span>{t.footer.location[lang]}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#122754] mb-4">
              {t.location.heading[lang]}
            </h2>
            
            <p className="text-gray-500 text-sm mb-10 max-w-xl">
              {t.location.subtitle[lang]}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#F26522]/30 shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      {cat.icon}
                    </div>
                    <h3 className="text-sm font-bold text-[#122754] tracking-wide">{cat.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="text-gray-500 text-xs flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-[#F26522] rounded-full shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Map Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-3 border border-gray-200 rounded-2xl translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500"></div>
            <div 
              className="relative overflow-hidden border border-gray-200 bg-white p-2.5 rounded-2xl shadow-md cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <img 
                src="/4.jpg" 
                alt="Project Location Map" 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover brightness-95 group-hover:brightness-100 transition-all duration-700 ease-out transform group-hover:scale-[1.01] rounded-lg"
              />
              <div className="absolute top-5 right-5 bg-white/90 p-2 text-[#F26522] rounded-full border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Full Screen Zoom Overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 sm:p-12 animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            <X size={28} />
          </button>
          <img 
            src="/4.jpg" 
            alt="Expanded Map" 
            className="max-w-full max-h-full object-contain shadow-2xl border border-white/10 rounded-lg animate-in zoom-in-95 duration-500"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Location;
