import React, { useState, useEffect } from 'react';
import { ShieldCheck, Headphones, TrendingUp, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const WhyChooseUs = () => {
  const { lang } = useLang();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: <ShieldCheck size={26} className="text-[#C5A880]" />,
      titleTh: 'ปลอดภัย น่าเชื่อถือ',
      titleEn: 'Safe & Trusted',
      descTh: 'ทุกประกาศผ่านการตรวจสอบ พร้อมข้อมูลจริงจากเจ้าของ ไม่ผ่านนายหน้า',
      descEn: 'Every listing is verified with real data directly from owners.',
    },
    {
      icon: <Headphones size={26} className="text-[#C5A880]" />,
      titleTh: 'ทีมงานดูแลตลอด',
      titleEn: '24/7 Support',
      descTh: 'ทีมที่ปรึกษาพร้อมช่วยเหลือทุกขั้นตอน ตั้งแต่ค้นหาจนปิดดีล',
      descEn: 'Our advisors help you through every step, from search to close.',
    },
    {
      icon: <TrendingUp size={26} className="text-[#C5A880]" />,
      titleTh: 'ราคายุติธรรม',
      titleEn: 'Fair Pricing',
      descTh: 'เปรียบเทียบราคาตลาดได้ทันที มั่นใจว่าคุณได้ราคาดีที่สุด',
      descEn: 'Compare market prices instantly. Get the best deal guaranteed.',
    },
  ];

  const testimonials = [
    {
      nameTh: 'คุณสมชาย วิชัยดิษฐ์',
      nameEn: 'Somchai W.',
      roleTh: 'ผู้ซื้อบ้านเดี่ยว ลำลูกกา',
      roleEn: 'Single House Buyer, Lam Luk Ka',
      textTh: 'ประทับใจมากครับ ขั้นตอนไม่ยุ่งยาก ทีมงานช่วยดูแลตั้งแต่เลือกบ้านจนถึงโอนกรรมสิทธิ์ ได้บ้านในฝันในราคาที่คุ้มค่ามาก',
      textEn: 'Very impressed! The process was seamless. The team helped from choosing the house to transferring ownership. Got my dream home at a great price.',
      rating: 5,
    },
    {
      nameTh: 'คุณพรทิพย์ แสนสุข',
      nameEn: 'Porntip S.',
      roleTh: 'ผู้ซื้อทาวน์โฮม คลองหลวง',
      roleEn: 'Townhome Buyer, Khlong Luang',
      textTh: 'เว็บไซต์ใช้งานง่ายมาก ค้นหาง่าย กรองราคาได้สะดวก เจ้าหน้าที่ตอบเร็วมาก แนะนำเลยค่ะ',
      textEn: 'The website is very easy to use. Easy search and price filtering. Staff responded very quickly. Highly recommend!',
      rating: 5,
    },
    {
      nameTh: 'คุณวิทยา จันทร์เจ้า',
      nameEn: 'Wittaya C.',
      roleTh: 'นักลงทุนอสังหาฯ ธัญบุรี',
      roleEn: 'Real Estate Investor, Thanyaburi',
      textTh: 'ใช้บริการมาหลายครั้ง ข้อมูลทรัพย์สินครบถ้วน ราคาตลาดจริง ไม่มีค่านายหน้าแอบแฝง เหมาะสำหรับนักลงทุนที่ต้องการข้อมูลจริง',
      textEn: 'Used the service multiple times. Complete property info with real market prices. No hidden broker fees. Perfect for investors.',
      rating: 5,
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeTestimonial];

  return (
    <section className="py-20 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Decorative subtle background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">

        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <ShieldCheck size={13} className="text-[#C5A880]" />
            {lang === 'th' ? 'ข้อดีของเรา' : 'Our Advantages'}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide text-glow">
            {lang === 'th' ? 'ทำไมต้องเลือกเรา?' : 'Why Choose Us?'}
          </h2>
          <p className="text-white/80 text-sm max-w-lg mx-auto leading-relaxed">
            {lang === 'th'
              ? 'เราเป็นแพลตฟอร์มขายอสังหาฯ ที่เชื่อถือได้ พร้อมให้บริการครบวงจร'
              : 'We are a trusted real estate platform with full-service support.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:shadow-2xl hover:border-[#4373B0]/30 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#C5A880]/15 group-hover:border-[#C5A880]/20 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {lang === 'th' ? feature.titleTh : feature.titleEn}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {lang === 'th' ? feature.descTh : feature.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide text-glow">
            {lang === 'th' ? 'เสียงจากลูกค้าของเรา' : 'What Our Customers Say'}
          </h3>
          <p className="text-white/70 text-sm font-light">
            {lang === 'th' ? 'รีวิวจริงจากผู้ซื้อที่ใช้บริการแล้ว' : 'Real reviews from verified buyers'}
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 text-center shadow-xl">
            {/* Quote icon */}
            <Quote size={32} className="text-[#C5A880]/30 mx-auto mb-4" />

            {/* Review text */}
            <p className="text-white/95 text-base md:text-lg leading-relaxed mb-6 italic font-light">
              "{lang === 'th' ? current.textTh : current.textEn}"
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={15} className="text-[#C5A880] fill-[#C5A880]" />
              ))}
            </div>

            {/* Name */}
            <p className="font-bold text-[#C5A880] text-sm tracking-wide">
              {lang === 'th' ? current.nameTh : current.nameEn}
            </p>
            <p className="text-xs text-white/50 mt-1 font-light">
              {lang === 'th' ? current.roleTh : current.roleEn}
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:bg-[#C5A880] hover:border-[#C5A880] hover:text-white transition-all text-white/80"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:bg-[#C5A880] hover:border-[#C5A880] hover:text-white transition-all text-white/80"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'bg-[#C5A880] w-6' : 'bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
