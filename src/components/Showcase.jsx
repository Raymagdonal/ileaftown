import React from 'react';
import PropertyCard from './PropertyCard';
import { useLang } from '../contexts/LanguageContext';
import { useCMS } from '../contexts/CMSContext';
import { Search, ChevronDown } from 'lucide-react';
import pathumthaniData from '../data/pathumthani';

const Showcase = ({ filters, onOpenModal, setFilters }) => {
  const { lang } = useLang();
  const { properties, translations: t, loading } = useCMS();

  if (loading || !t) {
    return (
      <div className="py-24 bg-transparent flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Numerical Price Parser helper
  const getNumericPrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  // Get ตำบล list based on selected อำเภอ
  const selectedAmphoeData = pathumthaniData.find(a => a.amphoe === filters.amphoe);
  const tambonList = selectedAmphoeData ? selectedAmphoeData.tambons : [];

  // Filter properties logic
  const filteredProperties = properties.filter((property) => {
    // 1. Search Query Filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const title = (property.title || '').toLowerCase();
      const desc = (property.description || '').toLowerCase();
      const houseNum = (property.houseNumber || '').toLowerCase();
      const highlights = (property.highlights || []).some(h => h.toLowerCase().includes(query));
      
      const matchText = title.includes(query) || desc.includes(query) || houseNum.includes(query) || highlights;
      if (!matchText) return false;
    }

    // 2. Max Price Filter
    if (filters.maxPrice) {
      const numPrice = getNumericPrice(property.price);
      const maxLimit = parseInt(filters.maxPrice, 10);
      if (numPrice > maxLimit) return false;
    }

    // 3. Bedrooms Filter
    if (filters.bedrooms) {
      const requiredBeds = parseInt(filters.bedrooms, 10);
      if ((property.bedrooms || 0) < requiredBeds) return false;
    }

    // 4. อำเภอ Filter
    if (filters.amphoe) {
      const propText = ((property.title || '') + ' ' + (property.description || '') + ' ' + (property.address || '')).toLowerCase();
      if (!propText.includes(filters.amphoe.toLowerCase())) return false;
    }

    // 5. ตำบล Filter
    if (filters.tambon) {
      const propText = ((property.title || '') + ' ' + (property.description || '') + ' ' + (property.address || '')).toLowerCase();
      if (!propText.includes(filters.tambon.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <section id="collection" className="py-12 bg-transparent relative">
      <div className="w-full mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Title Area */}
        <div className="border-b border-gray-200/60 pb-4 mb-8 flex justify-between items-baseline flex-wrap gap-4">
          <div>
            <h2 className="font-sans text-2xl font-bold text-gray-800 flex items-center gap-2">
              {t.showcase.heading[lang]}
            </h2>
            <p className="text-gray-500 text-xs mt-1">{t.showcase.desc[lang]}</p>
          </div>
          <div className="text-sm text-gray-500 font-sans">
            {lang === 'th' ? `พบทั้งหมด ${filteredProperties.length} รายการ` : `Found ${filteredProperties.length} items`}
          </div>
        </div>

        {/* 2-Column Marketplace Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar: Filters */}
          <aside className="w-full lg:w-1/4 bg-white/90 backdrop-blur-md border border-gray-200/60 p-6 rounded-xl shadow-md lg:sticky lg:top-24 z-30">
            <h3 className="font-bold text-blue-600 border-b border-gray-200/60 pb-3 mb-4 uppercase tracking-wide text-xs">
              {lang === 'th' ? 'กรองประกาศอสังหาฯ' : 'Filter Listings'}
            </h3>
            
            <div className="space-y-5">
              {/* Keywords */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                  {lang === 'th' ? 'คำค้นหาที่ต้องการ' : 'Search Term'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                    placeholder={lang === 'th' ? 'ค้นหาทำเล โครงการ...' : 'Find location, project...'}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 py-2.5 pl-9 pr-3 outline-none text-xs rounded-lg transition-all font-sans text-gray-800 placeholder-gray-400"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                </div>
              </div>

              {/* อำเภอ */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                  {lang === 'th' ? 'อำเภอ' : 'District'}
                </label>
                <div className="relative">
                  <select
                    value={filters.amphoe}
                    onChange={(e) => setFilters(prev => ({ ...prev, amphoe: e.target.value, tambon: '' }))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 py-2.5 pl-3 pr-10 outline-none text-xs rounded-lg appearance-none cursor-pointer transition-all font-sans text-gray-800"
                  >
                    <option value="">{lang === 'th' ? 'ทุกอำเภอ' : 'All Districts'}</option>
                    {pathumthaniData.map((d) => (
                      <option key={d.amphoe} value={d.amphoe}>{d.amphoe}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* ตำบล */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                  {lang === 'th' ? 'ตำบล' : 'Sub-district'}
                </label>
                <div className="relative">
                  <select
                    value={filters.tambon}
                    onChange={(e) => setFilters(prev => ({ ...prev, tambon: e.target.value }))}
                    disabled={!filters.amphoe}
                    className={`w-full bg-gray-50 border border-gray-200 focus:border-blue-500 py-2.5 pl-3 pr-10 outline-none text-xs rounded-lg appearance-none cursor-pointer transition-all font-sans text-gray-800 ${!filters.amphoe ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <option value="">{lang === 'th' ? 'ทุกตำบล' : 'All Sub-districts'}</option>
                    {tambonList.map((tb) => (
                      <option key={tb} value={tb}>{tb}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Price range selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                  {lang === 'th' ? 'ราคาไม่เกิน' : 'Max Budget'}
                </label>
                <div className="relative">
                  <select
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 py-2.5 pl-3 pr-10 outline-none text-xs rounded-lg appearance-none cursor-pointer transition-all font-sans text-gray-800"
                  >
                    <option value="">{lang === 'th' ? 'ทุกราคา' : 'Any Price'}</option>
                    <option value="3000000">{lang === 'th' ? '3.0 ล้านบาท' : '฿3.0M'}</option>
                    <option value="4500000">{lang === 'th' ? '4.5 ล้านบาท' : '฿4.5M'}</option>
                    <option value="5000000">{lang === 'th' ? '5.0 ล้านบาท' : '฿5.0M'}</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Bedrooms selection */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                  {lang === 'th' ? 'จำนวนห้องนอน' : 'Bedrooms'}
                </label>
                <div className="relative">
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 py-2.5 pl-3 pr-10 outline-none text-xs rounded-lg appearance-none cursor-pointer transition-all font-sans text-gray-800"
                  >
                    <option value="">{lang === 'th' ? 'ทั้งหมด' : 'Any Beds'}</option>
                    <option value="3">{lang === 'th' ? '3 ห้องนอนขึ้นไป' : '+ Bedrooms'}</option>
                    <option value="4">{lang === 'th' ? '4 ห้องนอนขึ้นไป' : '+ Bedrooms'}</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Reset/Clear action */}
              {(filters.searchQuery || filters.maxPrice || filters.bedrooms || filters.amphoe || filters.tambon) ? (
                <button
                  onClick={() => setFilters({ searchQuery: '', maxPrice: '', bedrooms: '', amphoe: '', tambon: '' })}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 font-semibold py-2.5 rounded-lg text-xs transition-all font-sans"
                >
                  {lang === 'th' ? 'ล้างการกรองทั้งหมด' : 'Clear Filters'}
                </button>
              ) : null}

            </div>
          </aside>

          {/* Right Panel: Listings Grid */}
          <div className="w-full lg:w-3/4">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm px-8">
                <p className="text-gray-700 text-base font-medium mb-1">
                  {lang === 'th' ? 'ไม่พบประกาศอสังหาริมทรัพย์ที่ตรงกับเงื่อนไข' : 'No listings match your search.'}
                </p>
                <p className="text-gray-400 text-xs font-light">
                  {lang === 'th' ? 'กรุณาลองปรับลดตัวเลือก หรือพิมพ์คำค้นหาอื่น' : 'Please modify your filters or search query.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.propertyId || property.id} property={property} onClick={() => onOpenModal(property)} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Showcase;
