import React, { useState } from 'react';
import { Layers, ChevronRight, Square, Maximize2 } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';

const FloorPlans = () => {
  const { lang } = useLang();
  const { translations: t } = useCMS();
  const [activeFloor, setActiveFloor] = useState(1);

  if (!t || !t.floorPlans) return null;

  return (
    <section id="floor-plans" className="py-20 bg-white text-gray-800 relative border-t border-gray-200 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#F26522] uppercase tracking-wider text-xs font-bold mb-3">
            <Layers size={14} />
            <span>Architectural Layout</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#122754] mb-4">
            {t.floorPlans.heading[lang]}
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto font-light">
            {t.floorPlans.subtitle[lang]}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          
          {/* Left: Interactive Tabs & Info */}
          <div className="w-full lg:w-5/12 space-y-5">
            <div className="flex flex-col gap-3.5">
              <button 
                onClick={() => setActiveFloor(1)}
                className={`p-5 text-left border rounded-xl transition-all duration-300 flex justify-between items-center group ${activeFloor === 1 ? 'border-[#122754] bg-gray-50' : 'border-gray-200 bg-white hover:border-[#122754]/50'}`}
              >
                <div>
                  <h3 className={`text-base font-bold mb-0.5 ${activeFloor === 1 ? 'text-[#122754]' : 'text-gray-700'}`}>
                    {t.floorPlans.floor1.title[lang]}
                  </h3>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Ground Floor Layout</p>
                </div>
                <ChevronRight size={18} className={activeFloor === 1 ? 'text-[#122754]' : 'text-gray-400'} />
              </button>

              <button 
                onClick={() => setActiveFloor(2)}
                className={`p-5 text-left border rounded-xl transition-all duration-300 flex justify-between items-center group ${activeFloor === 2 ? 'border-[#122754] bg-gray-50' : 'border-gray-200 bg-white hover:border-[#122754]/50'}`}
              >
                <div>
                  <h3 className={`text-base font-bold mb-0.5 ${activeFloor === 2 ? 'text-[#122754]' : 'text-gray-700'}`}>
                    {t.floorPlans.floor2.title[lang]}
                  </h3>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Upper Floor Layout</p>
                </div>
                <ChevronRight size={18} className={activeFloor === 2 ? 'text-[#122754]' : 'text-gray-400'} />
              </button>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm animate-in fade-in duration-350">
              <h4 className="text-[#122754] font-bold uppercase tracking-wider text-xs mb-3">รายละเอียดแพลนบ้าน</h4>
              <p className="text-gray-600 text-xs md:text-sm mb-5 leading-relaxed">
                {activeFloor === 1 ? t.floorPlans.floor1.desc[lang] : t.floorPlans.floor2.desc[lang]}
              </p>
              <div className="space-y-2.5">
                {(activeFloor === 1 ? t.floorPlans.floor1.rooms[lang] : t.floorPlans.floor2.rooms[lang]).map((room, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <Square size={8} className="text-[#F26522] fill-[#F26522]/10" />
                    <span>{room}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Plan Image Display */}
          <div className="w-full lg:w-7/12 flex justify-center relative">
            <div className="relative bg-white p-3 border border-gray-200 rounded-2xl shadow-md max-w-sm w-full mx-auto">
              <div className="absolute top-5 right-5 z-10">
                <div className="bg-white/95 border border-gray-200 p-2 text-gray-500 hover:text-[#122754] rounded-full shadow-sm cursor-pointer">
                  <Maximize2 size={14} />
                </div>
              </div>
              <img 
                src={activeFloor === 1 ? "/1.jpg" : "/2.jpg"} 
                alt={`Floor ${activeFloor} Plan`}
                className="w-full h-auto object-contain bg-white min-h-[260px] rounded-lg animate-in zoom-in-95 duration-500"
              />
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-gray-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#122754]">
                   {activeFloor === 1 ? '01 // Ground Level' : '02 // Private Suite'}
                </span>
                <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">Luxury Showcase</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FloorPlans;
