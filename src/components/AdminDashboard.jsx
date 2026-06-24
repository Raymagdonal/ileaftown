import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Globe, Home, Image as ImageIcon, 
  ArrowLeft, CheckCircle, Upload, Loader2, ChevronRight, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../contexts/CMSContext';
import { useLang } from '../contexts/LanguageContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { 
    properties, translations, loading, 
    addProperty, updateProperty, deleteProperty, 
    updateAllTranslations, uploadFile, uploadMultipleFiles 
  } = useCMS();

  const [activeTab, setActiveTab] = useState('properties');
  const [editingProperty, setEditingProperty] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Property Form State
  const initialFormState = {
    propertyId: '',
    houseNumber: '',
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    kitchens: '',
    coverImage: '',
    videoUrl: '',
    floorPlan1: '',
    floorPlan2: '',
    gallery: [],
    highlights: [''],
    hideFloorPlans: false,
    hideVideo: false
  };
  const [formState, setFormState] = useState(initialFormState);

  // Translation Editor State (Flattened)
  const [flatTranslations, setFlatTranslations] = useState([]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-gold w-12 h-12" />
      </div>
    );
  }

  // Handle Property Form Changes
  const handlePropChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formState.highlights];
    newHighlights[index] = value;
    setFormState(prev => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlightField = () => {
    setFormState(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
  };

  const removeHighlightField = (index) => {
    setFormState(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (file) => {
    setIsSaving(true);
    try {
      const url = await uploadFile(file);
      setFormState(prev => ({ ...prev, coverImage: url }));
    } catch (e) {
      alert('อัปโหลดรูปภาพล้มเหลว');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFloorPlan1Upload = async (file) => {
    setIsSaving(true);
    try {
      const url = await uploadFile(file);
      setFormState(prev => ({ ...prev, floorPlan1: url }));
    } catch (e) {
      alert('อัปโหลดแปลนชั้น 1 ล้มเหลว');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFloorPlan2Upload = async (file) => {
    setIsSaving(true);
    try {
      const url = await uploadFile(file);
      setFormState(prev => ({ ...prev, floorPlan2: url }));
    } catch (e) {
      alert('อัปโหลดแปลนชั้น 2 ล้มเหลว');
    } finally {
      setIsSaving(false);
    }
  };

  const handleVideoUpload = async (file) => {
    setIsSaving(true);
    try {
      const url = await uploadFile(file);
      setFormState(prev => ({ ...prev, videoUrl: url }));
    } catch (e) {
      alert('อัปโหลดวีดีโอล้มเหลว');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGalleryUpload = async (files) => {
    if (files.length === 0) return;
    setIsSaving(true);
    try {
      const urls = await uploadMultipleFiles(files);
      setFormState(prev => ({ 
        ...prev, 
        gallery: [...(prev.gallery || []), ...urls] 
      }));
    } catch (e) {
      alert('อัปโหลดรูปภาพแกลเลอรี่ล้มเหลว');
    } finally {
      setIsSaving(false);
    }
  };

  const removeGalleryImage = (index) => {
    setFormState(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const saveProperty = async () => {
    setIsSaving(true);
    if (isAdding) {
      const newId = `residency-${properties.length + 1}-${Date.now()}`;
      await addProperty({ ...formState, propertyId: newId });
    } else {
      await updateProperty(formState.propertyId, formState);
    }
    cancelEdit();
    setIsSaving(false);
  };

  const cancelEdit = () => {
    setEditingProperty(null);
    setIsAdding(false);
    setFormState(initialFormState);
  };

  const startEdit = (prop) => {
    setEditingProperty(prop);
    setFormState({ ...prop });
    setIsAdding(false);
  };

  // Translations Logic
  const initTranslationEdit = () => {
    const flattened = [];
    const flatten = (obj, prefix = '') => {
      Object.keys(obj).forEach(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (obj[key].th && obj[key].en) {
          flattened.push({ key: fullKey, th: obj[key].th, en: obj[key].en });
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          flatten(obj[key], fullKey);
        }
      });
    };
    flatten(translations);
    setFlatTranslations(flattened);
  };

  const handleTranslationChange = (index, field, value) => {
    const updated = [...flatTranslations];
    updated[index][field] = value;
    setFlatTranslations(updated);
  };

  const saveTranslations = async () => {
    setIsSaving(true);
    await updateAllTranslations(flatTranslations);
    setIsSaving(false);
    alert('บันทึกข้อมูลหน้าเว็บสำเร็จ!');
  };

  return (
    <div className="min-h-screen bg-cream text-darkText font-sans">
      {/* Admin Nav */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-warmBorder z-50 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-lightGray hover:text-gold transition-colors flex items-center gap-2">
            <ArrowLeft size={18} />
            <span className="text-sm uppercase tracking-widest hidden sm:inline">กลับหน้าหลัก</span>
          </button>
          <div className="h-6 w-px bg-warmBorder"></div>
          <h1 className="font-display text-xl sm:text-2xl text-darkText tracking-wide">
            ระบบ<span className="text-gold">หลังบ้าน</span>
          </h1>
        </div>

        <div className="flex gap-1 bg-[#F5F0E6] p-1 rounded-[12px] border border-warmBorder">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-[8px] text-sm transition-all flex items-center gap-2 ${activeTab === 'properties' ? 'bg-gold text-white font-semibold shadow-sm' : 'text-lightGray hover:text-darkText'}`}
          >
            <Home size={16} /> จัดการบ้าน
          </button>
          <button 
            onClick={() => { setActiveTab('translations'); initTranslationEdit(); }}
            className={`px-4 py-2 rounded-[8px] text-sm transition-all flex items-center gap-2 ${activeTab === 'translations' ? 'bg-gold text-white font-semibold shadow-sm' : 'text-lightGray hover:text-darkText'}`}
          >
            <Globe size={16} /> เนื้อหาเว็บ
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && !editingProperty && !isAdding && (
          <div>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-display text-darkText italic">รายการทรัพย์สิน</h2>
                <p className="text-lightGray text-sm mt-1">จัดการ เพิ่ม ลบ หรือแก้ไขรายละเอียดบ้านในฐานข้อมูล MongoDB Atlas</p>
              </div>
              <button 
                onClick={() => { setIsAdding(true); setFormState(initialFormState); }}
                className="bg-gold hover:bg-brass text-white font-semibold px-6 py-2.5 text-xs uppercase tracking-widest transition-all flex items-center gap-2 rounded-[12px] shadow-sm"
              >
                <Plus size={16} /> เพิ่มบ้านใหม่
              </button>
            </div>

            {/* Analytics Summary Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border border-warmBorder bg-white p-6 rounded-[24px] shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-lightGray mb-1">
                  จำนวนบ้านทั้งหมด / Total Listings
                </span>
                <span className="text-2xl font-display text-darkText">{properties.length} หลัง</span>
              </div>
              <div className="flex flex-col border-t md:border-t-0 md:border-l border-warmBorder pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] uppercase tracking-widest text-lightGray mb-1">
                  ยอดการเข้าชมรวม / Total Pageviews
                </span>
                <span className="text-2xl font-display text-gold text-glow">
                  {properties.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()} ครั้ง
                </span>
              </div>
              <div className="flex flex-col border-t md:border-t-0 md:border-l border-warmBorder pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] uppercase tracking-widest text-lightGray mb-1">
                  บ้านที่ได้รับความสนใจสูงสุด / Most Viewed Listing
                </span>
                {properties.length > 0 ? (
                  (() => {
                    const mostViewed = [...properties].sort((a, b) => (b.views || 0) - (a.views || 0))[0];
                    return (
                      <span className="text-sm font-sans text-darkText truncate max-w-xs mt-1">
                        {mostViewed.title} ({mostViewed.views || 0} views)
                      </span>
                    );
                  })()
                ) : (
                  <span className="text-sm font-sans text-lightGray mt-1">ไม่มีข้อมูล</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(prop => (
                <div key={prop.propertyId || prop.id} className="bg-white rounded-[24px] border border-warmBorder overflow-hidden group hover:border-gold/40 hover:shadow-lg transition-all duration-300">
                  <div className="h-48 overflow-hidden relative bg-[#FAF8F5]">
                    <img 
                      src={prop.coverImage} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => { e.target.onError = null; e.target.src = 'https://placehold.co/1200x800/f5f0e6/C5A880?text=No+Image' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4 bg-gold text-white text-[10px] font-bold uppercase py-1 px-3 tracking-widest rounded-full shadow-sm">
                      {prop.houseNumber}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2 truncate text-darkText">{prop.title}</h3>
                    
                    {/* View Counter Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-lightGray mb-4 bg-[#FAF8F5] py-1.5 px-3 rounded-full w-fit border border-warmBorder shadow-sm">
                      <Eye size={13} className="text-gold" />
                      <span>{(prop.views || 0).toLocaleString()} {translations.card?.views?.[lang] || 'เข้าชม'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gold text-sm font-semibold">{prop.price}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => startEdit(prop)}
                          className="p-2 bg-[#FAF8F5] hover:bg-gold hover:text-white text-lightGray transition-all rounded-[10px] border border-warmBorder shadow-sm"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => { if(confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?')) deleteProperty(prop.propertyId) }}
                          className="p-2 bg-[#FAF8F5] hover:bg-red-50 text-lightGray hover:text-red-600 transition-all rounded-[10px] border border-warmBorder shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROPERTY EDIT/ADD FORM */}
        {(isAdding || editingProperty) && (
          <div className="bg-white p-8 sm:p-12 border border-warmBorder rounded-[28px] shadow-md animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-center mb-10 border-b border-warmBorder pb-6">
              <h2 className="text-3xl font-display italic text-darkText">{isAdding ? 'เพิ่มข้อมูลบ้านใหม่' : 'แก้ไขข้อมูลบ้าน'}</h2>
              <button onClick={cancelEdit} className="text-lightGray hover:text-gold transition-colors"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">ชื่อหัวข้อบ้าน (Title)</label>
                  <input 
                    name="title" value={formState.title} onChange={handlePropChange}
                    className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">รายละเอียดบ้าน (Description)</label>
                  <textarea 
                    name="description" value={formState.description} onChange={handlePropChange} rows={4}
                    className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none resize-none text-darkText transition-all" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">เลขที่บ้าน / แปลง (House Number)</label>
                    <input name="houseNumber" value={formState.houseNumber} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">ราคาลดพิเศษ (Discount Price)</label>
                    <input name="price" value={formState.price} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" placeholder="เช่น 5.9 ล้านบาท" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">ราคาเดิม (Original Price - สำหรับขีดฆ่า)</label>
                  <input name="originalPrice" value={formState.originalPrice} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" placeholder="เช่น 6.5 ล้านบาท (เว้นว่างไว้หากไม่มีส่วนลด)" />
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-lightGray mb-2 font-bold">พื้นที่ (ตร.ม.)</label>
                    <input type="number" name="area" value={formState.area} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-lightGray mb-2 font-bold">ห้องนอน</label>
                    <input type="number" name="bedrooms" value={formState.bedrooms} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-lightGray mb-2 font-bold">ห้องน้ำ</label>
                    <input type="number" name="bathrooms" value={formState.bathrooms} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-lightGray mb-2 font-bold">ห้องครัว</label>
                    <input type="number" name="kitchens" value={formState.kitchens} onChange={handlePropChange} className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                  </div>
                </div>
              </div>

              {/* Right Column: Image & Highlights */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">รูปภาพหน้าปก (Cover Image)</label>
                  {formState.coverImage && (
                    <div className="relative h-48 w-full mb-4 border border-warmBorder bg-[#FAF8F5] rounded-[14px] overflow-hidden">
                      <img src={formState.coverImage} className="w-full h-full object-contain" alt="" />
                      <button 
                        onClick={() => setFormState(prev => ({ ...prev, coverImage: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <input name="coverImage" value={formState.coverImage} onChange={handlePropChange} placeholder="วางลิงก์รูปภาพ หรืออัปโหลด" className="flex-grow bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                    <label className="cursor-pointer bg-[#F5F0E6] hover:bg-gold hover:text-white py-3 px-4 transition-all rounded-[10px] border border-warmBorder flex items-center justify-center text-lightGray shadow-sm">
                      {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
                    </label>
                  </div>
                  <p className="text-[10px] text-lightGray mt-2 italic">*รองรับการอัปโหลดไฟล์จริงจากเครื่อง และจะถูกจัดเก็บในระบบ</p>
                </div>

                {/* Floor Plan 1 & 2 Inputs (New) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">แปลนบ้านชั้นล่าง (Floor Plan Level 1)</label>
                    {formState.floorPlan1 && (
                      <div className="relative h-28 w-full mb-2 border border-warmBorder bg-[#FAF8F5] rounded-[10px] overflow-hidden">
                        <img src={formState.floorPlan1} className="w-full h-full object-contain" alt="" />
                        <button 
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, floorPlan1: '' }))}
                          className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input name="floorPlan1" value={formState.floorPlan1 || ''} onChange={handlePropChange} placeholder="ลิงก์แปลนชั้น 1" className="flex-grow bg-[#FAF8F5] border border-warmBorder rounded-[8px] px-2.5 py-2 text-xs focus:border-gold outline-none text-darkText transition-all" />
                      <label className="cursor-pointer bg-[#F5F0E6] hover:bg-gold hover:text-white p-2 transition-all rounded-[8px] border border-warmBorder flex items-center justify-center text-lightGray shadow-sm">
                        {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFloorPlan1Upload(e.target.files[0])} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">แปลนบ้านชั้นบน (Floor Plan Level 2)</label>
                    {formState.floorPlan2 && (
                      <div className="relative h-28 w-full mb-2 border border-warmBorder bg-[#FAF8F5] rounded-[10px] overflow-hidden">
                        <img src={formState.floorPlan2} className="w-full h-full object-contain" alt="" />
                        <button 
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, floorPlan2: '' }))}
                          className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input name="floorPlan2" value={formState.floorPlan2 || ''} onChange={handlePropChange} placeholder="ลิงก์แปลนชั้น 2" className="flex-grow bg-[#FAF8F5] border border-warmBorder rounded-[8px] px-2.5 py-2 text-xs focus:border-gold outline-none text-darkText transition-all" />
                      <label className="cursor-pointer bg-[#F5F0E6] hover:bg-gold hover:text-white p-2 transition-all rounded-[8px] border border-warmBorder flex items-center justify-center text-lightGray shadow-sm">
                        {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFloorPlan2Upload(e.target.files[0])} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#FAF8F5] p-3 border border-warmBorder rounded-[10px] shadow-sm select-none">
                  <input 
                    type="checkbox" 
                    id="hideFloorPlans"
                    name="hideFloorPlans"
                    checked={!!formState.hideFloorPlans}
                    onChange={(e) => setFormState(prev => ({ ...prev, hideFloorPlans: e.target.checked }))}
                    className="w-4.5 h-4.5 text-gold border-warmBorder rounded focus:ring-gold cursor-pointer"
                  />
                  <label htmlFor="hideFloorPlans" className="text-xs text-lightGray font-sans cursor-pointer flex-grow">
                    ปิดการมองเห็นหัวข้อแปลนบ้านหน้ารายละเอียดทรัพย์สิน
                  </label>
                </div>

                {/* Gallery Images List Editor (Allows Editing All Images) */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-xs uppercase tracking-widest text-gold font-bold italic">อัลบั้มรูปภาพ (Gallery Images)</label>
                    <div className="flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setFormState(prev => ({ ...prev, gallery: [...(prev.gallery || []), ''] }))}
                        className="text-[10px] uppercase tracking-widest text-lightGray hover:text-gold flex items-center gap-1 font-bold transition-colors"
                      >
                        <Plus size={12} /> เพิ่มช่อง URL
                      </button>
                      <label className="cursor-pointer text-[10px] uppercase tracking-widest text-lightGray hover:text-gold flex items-center gap-1 font-bold transition-colors">
                        {isSaving ? <Loader2 className="animate-spin" size={12} /> : <Upload size={12} />}
                        อัปโหลดรูปภาพใหม่
                        <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => handleGalleryUpload(e.target.files)} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto p-3 bg-[#FAF8F5]/50 border border-warmBorder rounded-[14px] custom-scrollbar">
                    {formState.gallery && formState.gallery.map((url, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-warmBorder shadow-sm">
                        {/* Image Preview Thumbnail */}
                        <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-50 border border-warmBorder flex-shrink-0">
                          {url ? (
                            <img src={url} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        
                        {/* Input URL field */}
                        <div className="flex-grow flex flex-col gap-1.5">
                          <input 
                            value={url}
                            onChange={(e) => {
                              const newGallery = [...formState.gallery];
                              newGallery[idx] = e.target.value;
                              setFormState(prev => ({ ...prev, gallery: newGallery }));
                            }}
                            placeholder="ลิงก์รูปภาพ หรืออัปโหลดจากทางขวา"
                            className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[6px] px-2 py-1.5 text-xs focus:border-gold outline-none text-darkText"
                          />
                        </div>

                        {/* Actions: Upload Replace & Delete */}
                        <div className="flex gap-1.5 flex-shrink-0">
                          <label className="cursor-pointer bg-[#F5F0E6] hover:bg-gold hover:text-white p-2 rounded-[6px] border border-warmBorder text-lightGray transition-all flex items-center justify-center">
                            <Upload size={14} />
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setIsSaving(true);
                                try {
                                  const uploadedUrl = await uploadFile(file);
                                  const newGallery = [...formState.gallery];
                                  newGallery[idx] = uploadedUrl;
                                  setFormState(prev => ({ ...prev, gallery: newGallery }));
                                } catch (err) {
                                  alert('อัปโหลดรูปล้มเหลว');
                                } finally {
                                  setIsSaving(false);
                                }
                              }} 
                            />
                          </label>
                          <button 
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="p-2 bg-red-50 hover:bg-red-500 hover:text-white text-lightGray border border-warmBorder rounded-[6px] transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!formState.gallery || formState.gallery.length === 0) && (
                      <div className="py-8 text-center text-xs text-lightGray uppercase tracking-widest">
                        ยังไม่มีรูปในอัลบั้ม
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-lightGray mt-2 italic">*คลิกไอคอนอัปโหลดเพื่อแทนที่รูปภาพเฉพาะช่อง หรือป้อนลิงก์ URL รูปภาพโดยตรงได้</p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-bold italic">วีดีโอตัวอย่าง (Property Video)</label>
                  {formState.videoUrl && (
                    <div className="relative h-48 w-full mb-4 border border-warmBorder bg-[#FAF8F5] rounded-[14px] overflow-hidden flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="animate-spin text-gold mx-auto mb-2" size={18} />
                        <p className="text-[10px] text-lightGray truncate max-w-xs">{formState.videoUrl.split('/').pop()}</p>
                      </div>
                      <button 
                        onClick={() => setFormState(prev => ({ ...prev, videoUrl: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <input name="videoUrl" value={formState.videoUrl} onChange={handlePropChange} placeholder="วางลิงก์วีดีโอ หรืออัปโหลด" className="flex-grow bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-3 text-sm focus:border-gold outline-none text-darkText transition-all" />
                    <label className="cursor-pointer bg-[#F5F0E6] hover:bg-gold hover:text-white py-3 px-4 transition-all rounded-[10px] border border-warmBorder flex items-center justify-center text-lightGray shadow-sm">
                      {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      <input type="file" className="hidden" accept="video/*" onChange={(e) => handleVideoUpload(e.target.files[0])} />
                    </label>
                  </div>
                  <p className="text-[10px] text-lightGray mt-2 italic">*รองรับไฟล์ MP4, WebM (แสดงผลในส่วน Video Tour)</p>
                  
                  <div className="flex items-center gap-2 mt-3 bg-[#FAF8F5] p-3 border border-warmBorder rounded-[10px] shadow-sm select-none">
                    <input 
                      type="checkbox" 
                      id="hideVideo"
                      name="hideVideo"
                      checked={!!formState.hideVideo}
                      onChange={(e) => setFormState(prev => ({ ...prev, hideVideo: e.target.checked }))}
                      className="w-4.5 h-4.5 text-gold border-warmBorder rounded focus:ring-gold cursor-pointer"
                    />
                    <label htmlFor="hideVideo" className="text-xs text-lightGray font-sans cursor-pointer flex-grow">
                      ปิดการมองเห็นหัวข้อวีดีโอตัวอย่างหน้ารายละเอียดทรัพย์สิน
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold italic">จุดเด่นของบ้าน (Highlights)</label>
                    <button 
                      type="button" 
                      onClick={addHighlightField}
                      className="text-[10px] uppercase tracking-widest text-lightGray hover:text-gold flex items-center gap-1 font-bold transition-colors"
                    >
                      <Plus size={12} /> เพิ่มจุดเด่น
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {formState.highlights.map((h, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input value={h} onChange={(e) => handleHighlightChange(idx, e.target.value)} className="flex-grow bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-2 text-sm focus:border-gold outline-none text-darkText transition-all font-sans" />
                        {formState.highlights.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeHighlightField(idx)} 
                            className="p-2 bg-red-50 hover:bg-red-500 hover:text-white text-lightGray rounded-[10px] transition-colors border border-warmBorder"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-warmBorder flex justify-end gap-4">
              <button 
                onClick={cancelEdit}
                className="px-8 py-3 text-xs uppercase tracking-[0.2em] text-lightGray hover:text-darkText transition-all font-semibold"
              >
                ยกเลิก
              </button>
              <button 
                onClick={saveProperty} disabled={isSaving}
                className="bg-gold text-white px-12 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-brass transition-all flex items-center gap-2 rounded-[12px] shadow-sm"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                {isAdding ? 'สร้างข้อมูลใหม่' : 'บันทึกการเปลี่ยนแปลง'}
              </button>
            </div>
          </div>
        )}

        {/* TRANSLATIONS TAB */}
        {activeTab === 'translations' && (
          <div className="bg-white border border-warmBorder rounded-[28px] shadow-sm overflow-hidden">
            <div className="p-8 border-b border-warmBorder flex justify-between items-center sticky top-20 bg-white/90 backdrop-blur-sm z-20">
              <div>
                <h2 className="text-3xl font-display italic text-darkText">ข้อความบนหน้าเว็บ</h2>
                <p className="text-lightGray text-sm mt-1">แก้ไขคำพาดหัว ป้ายประกาศ และข้อความในปุ่มต่างๆ ทั้งเวอร์ชันภาษาไทยและอังกฤษ</p>
              </div>
              <button 
                onClick={saveTranslations} disabled={isSaving}
                className="bg-gold text-white font-bold px-10 py-3 rounded-[12px] hover:bg-brass transition-all flex items-center gap-2 uppercase tracking-widest text-xs shadow-sm"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />} บันทึกทั้งหมด
              </button>
            </div>

            <div className="p-8 space-y-12">
              <div className="grid grid-cols-12 gap-6 text-[10px] uppercase tracking-widest text-gold border-b border-warmBorder pb-4 font-bold">
                <div className="col-span-3">รหัสอ้างอิง (Key)</div>
                <div className="col-span-4 pl-6 border-l border-warmBorder">ภาษาไทย (TH)</div>
                <div className="col-span-4 pl-6 border-l border-warmBorder">ภาษาอังกฤษ (EN)</div>
              </div>

              {flatTranslations.map((item, index) => (
                <div key={item.key} className="grid grid-cols-12 gap-6 items-start group">
                  <div className="col-span-3">
                    <code className="text-[10px] text-lightGray bg-[#FAF8F5] border border-warmBorder px-2.5 py-1 rounded-[6px]">{item.key}</code>
                  </div>
                  <div className="col-span-4 border-l border-warmBorder pl-6">
                    {Array.isArray(item.th) ? (
                      <div className="space-y-2">
                        {item.th.map((val, i) => (
                          <input 
                            key={i} value={val} 
                            onChange={(e) => {
                              const newArr = [...item.th];
                              newArr[i] = e.target.value;
                              handleTranslationChange(index, 'th', newArr);
                            }}
                            className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-2 text-xs focus:border-gold outline-none font-sans text-darkText transition-all" 
                          />
                        ))}
                      </div>
                    ) : (
                      <textarea 
                        value={item.th} 
                        onChange={(e) => handleTranslationChange(index, 'th', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-2 text-xs focus:border-gold outline-none h-20 resize-none font-sans text-darkText transition-all" 
                      />
                    )}
                  </div>
                  <div className="col-span-4 border-l border-warmBorder pl-6">
                    {Array.isArray(item.en) ? (
                      <div className="space-y-2">
                        {item.en.map((val, i) => (
                          <input 
                            key={i} value={val} 
                            onChange={(e) => {
                              const newArr = [...item.en];
                              newArr[i] = e.target.value;
                              handleTranslationChange(index, 'en', newArr);
                            }}
                            className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-2 text-xs focus:border-gold outline-none font-sans text-darkText transition-all" 
                          />
                        ))}
                      </div>
                    ) : (
                      <textarea 
                        value={item.en} 
                        onChange={(e) => handleTranslationChange(index, 'en', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-warmBorder rounded-[10px] p-2 text-xs focus:border-gold outline-none h-20 resize-none font-sans text-darkText transition-all" 
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
