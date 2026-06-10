import React, { useState, useRef } from 'react';
import { BedDouble, Bath, ChefHat, Maximize, ChevronLeft, ChevronRight, MapPin, Truck, Sparkles, Quote } from 'lucide-react';
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
        icon: <Sparkles size={18} className="text-gold" />,
        label: 'เปิดจอง',
        text: trimmed.replace(/^เปิดจอง\s*[!！:\-–]*\s*/i, ''),
      };
    }

    if (/^(🚗|เดินทางสะดวก)/i.test(trimmed)) {
      return {
        icon: <Truck size={18} className="text-gold" />,
        label: 'เดินทางสะดวก',
        text: trimmed.replace(/^🚗\s*/i, ''),
      };
    }

    if (/^(📍|ที่ตั้ง)/i.test(trimmed)) {
      return {
        icon: <MapPin size={18} className="text-gold" />,
        label: 'ที่ตั้ง',
        text: trimmed.replace(/^(📍|ที่ตั้ง)\s*/i, ''),
      };
    }

    if (/^["“”]/.test(trimmed) || /"$/.test(trimmed)) {
      return {
        icon: <Quote size={18} className="text-gold" />,
        label: 'คีย์ไฮไลท์',
        text: trimmed,
      };
    }

    return {
      icon: <Sparkles size={18} className="text-gold" />,
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

  const scrollThumbnails = (direction) => {
    if (!thumbRowRef.current) return;
    const width = thumbRowRef.current.clientWidth * 0.8;
    thumbRowRef.current.scrollBy({ left: direction === 'left' ? -width : width, behavior: 'smooth' });
  };

  const gallery = Array.isArray(property.gallery) ? property.gallery : [];
  const orderedGallery = property.coverImage
    ? [property.coverImage, ...gallery.filter((image) => image !== property.coverImage)]
    : gallery;

  const visibleCount = 5;
  const totalGallery = orderedGallery.length;

  // sliding window for visible thumbnails so the active index stays in view
  const getThumbWindow = (index) => {
    if (totalGallery <= visibleCount) return { start: 0, window: orderedGallery };
    const half = Math.floor(visibleCount / 2);
    let start = index - half;
    if (start < 0) start = 0;
    if (start > totalGallery - visibleCount) start = totalGallery - visibleCount;
    return { start, window: orderedGallery.slice(start, start + visibleCount) };
  };

  const { start: thumbStart, window: visibleGallery } = getThumbWindow(carouselIndex);
  const mainImage = orderedGallery.length > 0 ? orderedGallery[carouselIndex] : property.coverImage;

  const handlePrevImage = () => {
    if (orderedGallery.length <= 1) return;
    setCarouselIndex((current) => (current === 0 ? orderedGallery.length - 1 : current - 1));
  };

  const handleNextImage = () => {
    if (orderedGallery.length <= 1) return;
    setCarouselIndex((current) => (current === orderedGallery.length - 1 ? 0 : current + 1));
  };

  const scrollThumbIntoView = (globalIndex) => {
    if (!thumbRowRef.current) return;
    const relIndex = globalIndex - thumbStart;
    const el = thumbRowRef.current.children[relIndex];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <>
      <div className="bg-[#121212] group border border-charcoal-800 hover:border-gold/30 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[520px] rounded-[36px]">
      {/* Left: Large image + thumbnails */}
      <div className="md:w-1/2 w-full bg-black flex flex-col">
        <div className="w-full h-96 md:h-[460px] xl:h-[520px] bg-black relative overflow-hidden">
          {property.originalPrice && (
            <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
              PROMOTION
            </div>
          )}

          {gallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 text-white hover:bg-gold hover:text-black transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 text-white hover:bg-gold hover:text-black transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {gallery.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); openPreview(carouselIndex); }}
              className="absolute bottom-4 left-4 z-20 bg-black/70 text-white px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] border border-white/10 hover:bg-gold hover:text-black transition-all duration-300"
            >
              ดูทั้งหมด {totalGallery} รูป
            </button>
          )}

          <img
            src={mainImage}
            alt={`${title} ${carouselIndex + 1}`}
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.onError = null; e.target.src = 'https://placehold.co/1200x800/1a1a1a/D4AF37?text=Image+Unavailable' }}
            onClick={(e) => { e.stopPropagation(); openPreview(carouselIndex); }}
            className="w-full h-80 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in"
          />
        </div>

        {gallery.length > 0 && (
          <div className="px-4 py-4 bg-[#111111] border-t border-white/5">
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollThumbnails('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-gold hover:text-black transition-all duration-300"
                aria-label="Scroll thumbnails left"
              >
                <ChevronLeft size={18} />
              </button>
              <div ref={thumbRowRef} className="flex gap-3 overflow-x-auto no-scrollbar px-3 md:px-0 pb-1 scroll-smooth">
                {visibleGallery.map((g, i) => {
                  const globalIndex = thumbStart + i;
                  return (
                    <button
                      key={globalIndex}
                      onClick={(e) => { e.stopPropagation(); setCarouselIndex(globalIndex); setTimeout(() => scrollThumbIntoView(globalIndex), 120); }}
                      className={`relative min-w-[110px] flex-shrink-0 overflow-hidden rounded-[26px] border ${carouselIndex === globalIndex ? 'border-gold/60 shadow-2xl' : 'border-white/10 shadow-sm'} transition-all duration-300 h-24 xl:h-28 aspect-[4/3]`}
                    >
                      <img
                        src={g}
                        alt={`${title} ${globalIndex + 1}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.target.onError = null; e.target.src = 'https://placehold.co/400x300/1a1a1a/D4AF37?text=No+Image' }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                      {globalIndex === 0 && (
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                          ดูทั้งหมด {totalGallery} รูป
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => scrollThumbnails('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-gold hover:text-black transition-all duration-300"
                aria-label="Scroll thumbnails right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            {/* progress bar */}
            {totalGallery > 1 && (
              <div className="h-2 bg-white/8 w-full rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${Math.round(((carouselIndex + 1) / Math.max(totalGallery, 1)) * 100)}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="md:w-1/2 w-full p-8 md:p-10 flex flex-col justify-between bg-[#141414]">
        <div className="mb-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-gold font-semibold">
            <span>{t.card.residency[lang]}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">{property.houseNumber}</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-4xl lg:text-5xl text-white leading-tight">{title}</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-gold font-bold text-3xl lg:text-4xl">{property.price}</div>
              {property.originalPrice && (
                <div className="text-gray-500 text-sm line-through opacity-60">{property.originalPrice}</div>
              )}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#0f0f0f] p-6 shadow-inner shadow-white/5">
            <div className="grid gap-4">
              {descriptionLines.map((line, idx) => {
                const { icon, label, text } = parseDescriptionLine(line);
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 shrink-0">{icon}</div>
                    <div>
                      <div className="text-white text-sm font-semibold mb-1">{label}</div>
                      <div className="text-gray-300 text-sm lg:text-base leading-relaxed">{text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {property.highlights && property.highlights.length > 0 && (
            <div className="rounded-[30px] border border-white/10 bg-[#0f0f0f] p-6 shadow-inner shadow-white/5">
              <div className="text-white text-sm font-semibold mb-4 uppercase tracking-[0.18em]">จุดเด่นของบ้าน</div>
              <ul className="space-y-4 text-gray-300 text-sm lg:text-base">
                {property.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-gold" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm lg:text-base">
          <div className="rounded-[22px] border border-white/10 bg-[#0f0f0f] p-4 flex items-center gap-3">
            <Maximize size={20} className="text-gold" />
            <span>{property.area} {t.card.sqm[lang]}</span>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[#0f0f0f] p-4 flex items-center gap-3">
            <BedDouble size={20} className="text-gold" />
            <span>{property.bedrooms} {t.card.bed[lang]}</span>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[#0f0f0f] p-4 flex items-center gap-3">
            <Bath size={20} className="text-gold" />
            <span>{property.bathrooms} {t.card.bath[lang]}</span>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[#0f0f0f] p-4 flex items-center gap-3">
            <ChefHat size={20} className="text-gold" />
            <span>{property.kitchens} {t.card.kit[lang]}</span>
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
