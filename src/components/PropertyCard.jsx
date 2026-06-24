import React, { useState, useRef } from 'react';
import { BedDouble, Bath, ChefHat, Maximize, ChevronLeft, ChevronRight, MapPin, Truck, Sparkles, Quote, Eye } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';

const PropertyCard = ({ property, onClick }) => {
  const { lang } = useLang();
  const { translations: t, incrementView } = useCMS();

  if (!t) return null;

  const title = property.title;
  const description = property.description;

  const descriptionLines = String(description || '').split(/\n+/).filter(Boolean);

  const parseDescriptionLine = (line) => {
    const trimmed = line.trim();

    if (/^เปิดจอง/i.test(trimmed)) {
      return {
        icon: <Sparkles size={14} className="text-blue-500" />,
        label: 'เปิดจอง',
        text: trimmed.replace(/^เปิดจอง\s*[!！:\-–]*\s*/i, ''),
      };
    }

    if (/^(🚗|เดินทางสะดวก)/i.test(trimmed)) {
      return {
        icon: <Truck size={14} className="text-blue-500" />,
        label: 'เดินทางสะดวก',
        text: trimmed.replace(/^🚗\s*/i, ''),
      };
    }

    if (/^(📍|ที่ตั้ง)/i.test(trimmed)) {
      return {
        icon: <MapPin size={14} className="text-blue-500" />,
        label: 'ที่ตั้ง',
        text: trimmed.replace(/^(📍|ที่ตั้ง)\s*/i, ''),
      };
    }

    if (/^[""\"]/.test(trimmed) || /"$/.test(trimmed)) {
      return {
        icon: <Quote size={14} className="text-blue-500" />,
        label: 'คีย์ไฮไลท์',
        text: trimmed,
      };
    }

    return {
      icon: <Sparkles size={14} className="text-blue-500" />,
      label: 'รายละเอียด',
      text: trimmed,
    };
  };

  const handleDetailsClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (incrementView) incrementView(property.propertyId || property.id);
    if (onClick) onClick();
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const thumbRowRef = useRef(null);
  
  const openPreview = (index = 0) => { setPreviewIndex(index); setPreviewOpen(true); };
  const closePreview = () => { setPreviewOpen(false); setPreviewIndex(0); };

  const gallery = Array.isArray(property.gallery) ? property.gallery : [];
  const orderedGallery = property.coverImage
    ? [property.coverImage, ...gallery.filter((image) => image !== property.coverImage)]
    : gallery;

  const totalGallery = orderedGallery.length;
  const mainImage = orderedGallery.length > 0 ? orderedGallery[carouselIndex] : property.coverImage;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (orderedGallery.length <= 1) return;
    setCarouselIndex((current) => (current === 0 ? orderedGallery.length - 1 : current - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (orderedGallery.length <= 1) return;
    setCarouselIndex((current) => (current === orderedGallery.length - 1 ? 0 : current + 1));
  };

  return (
    <>
      <div 
        onClick={handleDetailsClick}
        className="bg-white border border-gray-200/60 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full cursor-pointer group"
      >
        {/* Top: Image Section (aspect-video) */}
        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
          {property.originalPrice && (
            <div className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase rounded shadow-sm">
              PROMOTION
            </div>
          )}

          {gallery.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-gray-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-gray-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {gallery.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); openPreview(carouselIndex); }}
              className="absolute bottom-2 right-2 z-20 bg-black/50 text-white px-2.5 py-1 rounded text-[9px] uppercase tracking-wider hover:bg-blue-600 transition-all"
            >
              {carouselIndex + 1}/{totalGallery} รูป
            </button>
          )}

          <img
            src={mainImage}
            alt={`${title} ${carouselIndex + 1}`}
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.onError = null; e.target.src = 'https://placehold.co/600x400/f0f4fa/3b82f6?text=Property+Image' }}
            className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Bottom: Details Panel */}
        <div className="p-4 flex flex-col justify-between flex-grow font-sans">
          <div className="space-y-1.5">
            {/* Price section */}
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-blue-600 font-bold text-lg tracking-tight">{property.price}</span>
              {property.originalPrice && (
                <span className="text-gray-400 text-xs line-through">{property.originalPrice}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
              {title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <MapPin size={11} className="text-gray-400 shrink-0" />
              <span className="truncate">{property.houseNumber}</span>
            </div>
          </div>

          {/* Simple Specs row & views count */}
          <div className="border-t border-gray-100 mt-4 pt-3.5 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] bg-slate-50 text-slate-600 border border-slate-200/60 px-2.5 py-1 rounded-md font-semibold shadow-sm">
                <Maximize size={12} className="text-slate-500" />
                <span>{property.area} ตร.ม.</span>
              </span>
              <span className="flex items-center gap-1.5 text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md font-semibold shadow-sm">
                <BedDouble size={12} className="text-blue-600" />
                <span>{property.bedrooms} นอน</span>
              </span>
              <span className="flex items-center gap-1.5 text-[10px] bg-amber-50 text-amber-800 border border-amber-100 px-2.5 py-1 rounded-md font-semibold shadow-sm">
                <Bath size={12} className="text-amber-600" />
                <span>{property.bathrooms} น้ำ</span>
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
              <Eye size={13} className="text-gray-400" />
              <span>{(property.views || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {previewOpen && (
        <ImageLightbox images={property.gallery} currentIndex={previewIndex} onClose={closePreview} onIndexChange={(idx) => setPreviewIndex(idx)} />
      )}
    </>
  );
};

export default PropertyCard;
