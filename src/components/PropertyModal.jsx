import React, { useState } from 'react';
import { X, CheckCircle, PlaySquare, Image as ImageIcon, MapPin, Send, ChevronRight, Layers, Phone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';
import ImageLightbox from './ImageLightbox';
import lineLogo from '../assets/line-logo.svg';

const PropertyModal = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [activeFloorPlan, setActiveFloorPlan] = useState(1);
  const { lang } = useLang();
  const { translations: t } = useCMS();

  if (!t) return null;

  const title = property.title;
  const description = property.description;
  const highlights = property.highlights || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-200 rounded-2xl animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white text-gray-500 p-2 rounded-full hover:bg-gray-100 hover:text-[#122754] transition-colors border border-gray-200 shadow-sm"
        >
          <X size={18} />
        </button>

        {/* Mobile Header: Visible only on mobile */}
        <div className="md:hidden p-5 bg-white border-b border-gray-100">
          <div className="text-[10px] text-blue-600 uppercase tracking-wider font-bold mb-1">
            <MapPin size={10} className="inline mr-1 -mt-0.5" />
            {property.houseNumber}
          </div>
          <h2 className="font-sans text-xl font-bold text-[#122754] mb-1.5">{title}</h2>
          <div className="text-lg font-bold text-blue-600">{property.price}</div>
        </div>

        {/* Left Column: Media */}
        <div className="w-full md:w-3/5 bg-gray-50 relative min-h-[30vh] md:min-h-full flex flex-col border-r border-gray-200">
          {/* Tabs */}
          <div className="relative md:absolute md:top-4 md:left-4 z-10 flex gap-1 bg-white md:bg-black/20 p-1 rounded-lg border border-gray-200 md:border-transparent m-3 md:m-0">
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all rounded-md font-bold ${activeTab === 'gallery' ? 'bg-[#122754] text-white shadow' : 'bg-transparent text-gray-500 hover:bg-gray-100 md:text-white/80 md:hover:bg-white/10'}`}
            >
              <ImageIcon size={14} /> {t.modal.gallery[lang]}
            </button>
            {!property.hideFloorPlans && (
              <button 
                onClick={() => setActiveTab('floorplan')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all rounded-md font-bold ${activeTab === 'floorplan' ? 'bg-[#122754] text-white shadow' : 'bg-transparent text-gray-500 hover:bg-gray-100 md:text-white/80 md:hover:bg-white/10'}`}
              >
                <Layers size={14} /> {lang === 'th' ? 'แปลนบ้าน' : 'Floor Plans'}
              </button>
            )}
            {!property.hideVideo && (
              <button 
                onClick={() => setActiveTab('video')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all rounded-md font-bold ${activeTab === 'video' ? 'bg-[#122754] text-white shadow' : 'bg-transparent text-gray-500 hover:bg-gray-100 md:text-white/80 md:hover:bg-white/10'}`}
              >
                <PlaySquare size={14} /> {t.modal.virtualTour[lang]}
              </button>
            )}
          </div>

          <div className="flex-grow flex flex-col items-center justify-center p-0">
            {activeTab === 'gallery' ? (
              <div className="w-full h-full flex flex-col">
                <div className="flex-grow flex items-center justify-center bg-gray-50 overflow-hidden relative aspect-video">
                  <img 
                    src={(property.gallery && property.gallery.length > 0) ? property.gallery[currentImageIndex] : property.coverImage} 
                    alt={title} 
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.onError = null; e.target.src = 'https://placehold.co/800x600/f0f4fa/122754?text=Property+Image' }}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setShowLightbox(true)}
                  />
                  
                  {/* Gallery Navigation Arrows */}
                  {property.gallery && property.gallery.length > 1 && (
                    <>
                      <button 
                        onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : property.gallery.length - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-colors rounded-full shadow-sm"
                      >
                        <ChevronRight size={18} className="rotate-180" />
                      </button>
                      <button 
                        onClick={() => setCurrentImageIndex(prev => (prev < property.gallery.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-colors rounded-full shadow-sm"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {property.gallery && property.gallery.length > 0 && (
                  <div className="flex gap-2 p-3 bg-white border-t border-gray-200 overflow-x-auto no-scrollbar">
                    {property.gallery.map((url, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-16 h-12 shrink-0 border-2 transition-all rounded overflow-hidden ${currentImageIndex === idx ? 'border-blue-600 shadow-sm' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                      >
                        <img src={url} className="w-full h-full object-cover" alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === 'floorplan' ? (
              <div className="w-full h-full bg-white flex flex-col p-6 min-h-[320px] md:min-h-full justify-between select-none">
                {/* Floor Selector Sub-tabs */}
                <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-full max-w-xs mx-auto">
                  <button 
                    onClick={() => setActiveFloorPlan(1)}
                    className={`flex-1 text-center py-1.5 text-xs tracking-wider transition-all rounded-md font-bold ${activeFloorPlan === 1 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 bg-transparent'}`}
                  >
                    {lang === 'th' ? 'แปลนชั้นล่าง' : 'Level 1'}
                  </button>
                  <button 
                    onClick={() => setActiveFloorPlan(2)}
                    className={`flex-1 text-center py-1.5 text-xs tracking-wider transition-all rounded-md font-bold ${activeFloorPlan === 2 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 bg-transparent'}`}
                  >
                    {lang === 'th' ? 'แปลนชั้นบน' : 'Level 2'}
                  </button>
                </div>

                {/* Interactive Floor Plan Image */}
                <div className="flex-grow flex items-center justify-center overflow-hidden border border-gray-100 rounded-xl p-2 max-h-[380px] relative">
                  <img 
                    src={activeFloorPlan === 1 
                      ? (property.floorPlan1 || '/1.jpg') 
                      : (property.floorPlan2 || '/2.jpg')
                    } 
                    alt={`Floor Plan Level ${activeFloorPlan}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.onError = null; e.target.src = 'https://placehold.co/800x600/f0f4fa/122754?text=Floor+Plan' }}
                    className="max-w-full max-h-[280px] md:max-h-[320px] object-contain bg-white rounded-lg animate-in zoom-in-95 duration-500 cursor-zoom-in"
                    onClick={() => setShowLightbox(true)}
                  />
                </div>

                {/* Caption descriptor */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                  <span>{activeFloorPlan === 1 ? '01 // Ground floor layout' : '02 // Second level layout'}</span>
                  <span className="text-blue-600">{property.houseNumber}</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center min-h-[260px] md:min-h-full">
                {property.videoUrl ? (
                  <video 
                    src={property.videoUrl} 
                    className="w-full h-full object-contain" 
                    controls 
                    autoPlay 
                    muted 
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <PlaySquare size={36} className="mb-2 text-blue-600" />
                    <p className="tracking-wide text-xs">{t.modal.tourPlaceholder[lang]}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details & Contact */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col bg-white overflow-y-auto custom-scrollbar max-h-[60vh] md:max-h-full">
          {/* Desktop Header */}
          <div className="hidden md:block">
            <div className="mb-1">
              <span className="text-blue-600 text-[10px] font-bold tracking-wider uppercase">
                <MapPin size={10} className="inline mr-1 -mt-0.5" />
                {property.houseNumber}
              </span>
            </div>
            
            <h2 className="font-sans text-2xl font-bold text-[#122754] mb-3">{title}</h2>
            <div className="flex items-baseline gap-3 mb-5">
              <div className="text-xl font-bold text-blue-600">{property.price}</div>
              {property.originalPrice && (
                <div className="text-xs text-gray-400 line-through opacity-70">
                  {property.originalPrice}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-xs md:text-sm mb-6 leading-relaxed">
            {description}
          </p>

          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase text-[#122754] mb-3">{t.modal.highlights[lang]}</h4>
            <ul className="space-y-2">
              {highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>



          {/* Contact Details (Instead of Form) */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-[#122754] mb-3">
              {lang === 'th' ? 'ช่องทางการติดต่อสอบถาม' : 'Contact Information'}
            </h4>
            
            <div className="flex flex-col gap-3">
              {/* Phone Card */}
              <a 
                href="tel:0855535755"
                className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50/80 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {lang === 'th' ? 'โทรติดต่อคุณกวาง' : 'Call Agent'}
                  </p>
                  <p className="text-base font-bold text-gray-800 tracking-tight mt-0.5">085-553-5755</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{lang === 'th' ? '(คุณกวาง)' : '(Kwang)'}</p>
                </div>
              </a>

              {/* LINE Card */}
              <a 
                href="https://line.me/ti/p/~kwang1066"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#E8F8EE] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img src={lineLogo} className="w-7 h-7" alt="LINE Logo" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {lang === 'th' ? 'แอดไลน์สอบถาม' : 'Add Line ID'}
                  </p>
                  <p className="text-base font-bold text-gray-800 tracking-tight mt-0.5">kwang1066</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{lang === 'th' ? 'แชทสอบถามข้อมูล' : 'Chat for details'}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {showLightbox && (
          <ImageLightbox 
            images={
              activeTab === 'floorplan' 
                ? [activeFloorPlan === 1 ? (property.floorPlan1 || '/1.jpg') : (property.floorPlan2 || '/2.jpg')]
                : (property.gallery && property.gallery.length > 0 ? property.gallery : [property.coverImage])
            }
            currentIndex={activeTab === 'floorplan' ? 0 : currentImageIndex}
            onClose={() => setShowLightbox(false)}
            onIndexChange={(index) => {
              if (activeTab !== 'floorplan') {
                setCurrentImageIndex(index);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyModal;
