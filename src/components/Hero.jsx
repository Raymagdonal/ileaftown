import React from 'react';
import { ChevronDown, Search, Home, Building2, Building, Map, FileText, DollarSign, Award, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';
import pathumthaniData from '../data/pathumthani';

const Hero = ({ filters, setFilters }) => {
  const { lang } = useLang();
  const { translations: t } = useCMS();

  if (!t) return null;

  const quickCategories = [
    { labelTh: 'บ้านเดี่ยว', labelEn: 'Single House', value: 'บ้าน', icon: <Home size={24} className="text-white group-hover:text-[#4373B0] transition-colors duration-300" /> },
    { labelTh: 'คอนโดมิเนียม', labelEn: 'Condo', value: 'คอนโด', icon: <Building2 size={24} className="text-white group-hover:text-[#4373B0] transition-colors duration-300" /> },
    { labelTh: 'ทาวน์โฮม', labelEn: 'Townhome', value: 'ทาวน์', icon: <Building size={24} className="text-white group-hover:text-[#4373B0] transition-colors duration-300" /> },
    { labelTh: 'ที่ดิน', labelEn: 'Land', value: 'ที่ดิน', icon: <Map size={24} className="text-white group-hover:text-[#4373B0] transition-colors duration-300" /> },
  ];

  const handleCategoryClick = (val) => {
    setFilters(prev => ({ ...prev, searchQuery: val }));
    const collectionSec = document.getElementById('collection');
    if (collectionSec) {
      collectionSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get ตำบล list based on selected อำเภอ
  const selectedAmphoeData = pathumthaniData.find(a => a.amphoe === filters.amphoe);
  const tambonList = selectedAmphoeData ? selectedAmphoeData.tambons : [];

  return (
    <section id="hero" className="relative w-full flex flex-col justify-center overflow-hidden bg-transparent pt-32 pb-16 border-b border-gray-200/40">
      {/* Decorative subtle background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-12 right-0 w-[400px] h-[400px] bg-amber-200/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Centered Heading */}
        <div className="text-center mb-8 max-w-3xl animate-in fade-in slide-in-from-top-6 duration-700">
          <span className="text-white uppercase tracking-[0.25em] text-xs font-bold mb-3 block drop-shadow-sm">
            {t.hero?.badge?.[lang] || 'ตลาดซื้อขายบ้านมือสองและโครงการใหม่'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans leading-tight text-[#122754] mb-4 font-bold tracking-tight text-outline-white">
            {t.hero?.title1?.[lang] || 'ค้นหาแหล่งซื้อขายอสังหาฯ'} {t.hero?.title2?.[lang] || 'ที่คุณต้องการ'}
          </h1>
          <p className="text-white/90 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            {t.hero?.subtitle?.[lang] || 'รวมประกาศบ้านเดี่ยว ทาวน์โฮม คอนโด บนทำเลศักยภาพ ติดต่อผู้ขายได้ทันที สะดวก รวดเร็ว'}
          </p>
        </div>

        {/* Floating Search & Filter Bar -> REPLACED with Premium Service & Promotion Card */}
        <div className="w-full bg-white/95 backdrop-blur-md border border-gray-200/60 p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-200/40 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side: Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Header Block */}
              <div>
                <span className="bg-[#4373B0]/10 text-[#4373B0] border border-[#4373B0]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {lang === 'th' ? 'สิทธิพิเศษสำหรับลูกค้า' : 'Exclusive Client Privileges'}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-[#1D4375] mt-3">
                  {lang === 'th' ? 'มีบ้านได้ง่ายๆ พร้อมบริการดูแลครบวงจร' : 'Own a Home Easily with Full VIP Services'}
                </h3>
                
                {/* Qualification Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 bg-green-50/75 border border-green-200/50 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                    <CheckCircle size={14} className="text-green-600" />
                    {lang === 'th' ? 'มีสลิปเงินเดือน' : 'Salary Slip'}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-green-50/75 border border-green-200/50 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                    <CheckCircle size={14} className="text-green-600" />
                    {lang === 'th' ? 'ปลอดภาระ (หรือภาระไม่เกิน)' : 'Debt Free / Low Debt'}
                  </span>
                </div>
              </div>

              {/* Service List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-2.5 items-start">
                  <div className="bg-[#4373B0]/10 border border-[#4373B0]/10 p-2 rounded-lg text-[#4373B0] mt-0.5">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">{lang === 'th' ? 'บริการเก็บเอกสารและยื่นกู้ให้' : 'Document Collection'}</h5>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{lang === 'th' ? 'อำนวยความสะดวกเดินทางเก็บเอกสารถึงที่' : 'We collect documents at your convenience.'}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="bg-[#4373B0]/10 border border-[#4373B0]/10 p-2 rounded-lg text-[#4373B0] mt-0.5">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">{lang === 'th' ? 'ดูแลสินเชื่อฟรี ไม่มีค่าใช้จ่าย' : 'Free Loan Processing'}</h5>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{lang === 'th' ? 'ประสานงานธนาคารให้ฟรี ไม่มีค่าใช้จ่ายใดๆ' : 'Coordinate bank applications at no cost.'}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="bg-[#4373B0]/10 border border-[#4373B0]/10 p-2 rounded-lg text-[#4373B0] mt-0.5">
                    <Award size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">{lang === 'th' ? 'ดูแลเคียงข้างจนถึงวันโอน' : 'Care Until Transfer'}</h5>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{lang === 'th' ? 'เคียงข้างคุณทุกขั้นตอนจนเสร็จสิ้น ณ กรมที่ดิน' : 'Companionship until official deed transfer.'}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="bg-[#4373B0]/10 border border-[#4373B0]/10 p-2 rounded-lg text-[#4373B0] mt-0.5">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">{lang === 'th' ? 'ลดขั้นตอนเตรียมเอกสาร' : 'Simplified Documentation'}</h5>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{lang === 'th' ? 'จัดเตรียมและแนะนำเอกสารอย่างรวดเร็วและง่าย' : 'Help simplify document preparation.'}</p>
                  </div>
                </div>
              </div>

              {/* Call To Action Block */}
              <div className="bg-gradient-to-r from-[#4373B0]/5 to-[#1D4375]/5 border border-[#EBE5DA] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-center sm:text-left">
                  <h4 className="text-xs font-bold text-[#1D4375]">{lang === 'th' ? 'เตรียมเอกสารให้พร้อม แล้วจองบ้านได้เลย!' : 'Prepare Documents & Book Now'}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{lang === 'th' ? 'นัดชมบ้านตัวอย่าง ปรึกษาสินเชื่อ ทักแชทได้ทันทีค่ะ' : 'Schedule private tour via chat.'}</p>
                </div>
                <a 
                  href="https://line.me/ti/p/~kwang1066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#4373B0] to-[#1D4375] hover:from-[#1D4375] hover:to-[#122754] text-white font-bold text-xs uppercase px-5 py-3 rounded-lg shadow-md shadow-blue-900/10 transition-all text-center"
                >
                  {lang === 'th' ? 'ทักแชทนัดชมบ้าน' : 'ทักแชทนัดชมบ้าน'}
                </a>
              </div>

            </div>

            {/* Right side: Modern Image Collage & Visual Features (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[260px] lg:min-h-full rounded-2xl overflow-hidden group/img shadow-md">
              {/* Main Image */}
              <img 
                src="/luxury-villa.png" 
                alt="Luxury Home" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover/img:scale-105"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl"></div>

              {/* Glass Card Floating Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 p-3.5 rounded-xl shadow-lg flex items-center gap-3">
                <div className="bg-gold text-white p-2 rounded-lg">
                  <Sparkles size={16} className="text-amber-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide drop-shadow-sm">{lang === 'th' ? 'บ้านพร้อมอยู่ ทำเลศักยภาพ' : 'Ready to Move In'}</h4>
                  <p className="text-[9px] text-white/90 mt-0.5 drop-shadow-sm">{lang === 'th' ? 'แต่งครบ กู้เต็มร้อย พร้อมเข้าอยู่ทันที' : 'Fully furnished & high loan eligibility'}</p>
                </div>
              </div>

              {/* Decorative Floating Circle */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/5 rounded-full border border-white/10 backdrop-blur-[1px] pointer-events-none"></div>
            </div>

          </div>
        </div>

        {/* Quick Category Icons */}
        <div className="mt-12 w-full max-w-3xl text-center">
          <p className="text-xs uppercase font-bold text-blue-100/80 mb-5 tracking-[0.2em] drop-shadow-sm">
            {lang === 'th' ? 'หมวดหมู่ด่วนยอดนิยม' : 'Popular Quick Categories'}
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            {quickCategories.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCategoryClick(cat.value)}
                className="flex flex-col items-center gap-3 cursor-pointer group px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-300/40 hover:bg-white/10 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 w-28 sm:w-32"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-white group-hover:bg-white transition-all duration-300">
                  {cat.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-white/95 group-hover:text-blue-200 transition-colors leading-tight tracking-wide">
                  {lang === 'th' ? cat.labelTh : cat.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
