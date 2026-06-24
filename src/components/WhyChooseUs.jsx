import React, { useState, useEffect } from 'react';
import { ShieldCheck, Headphones, Home, TrendingUp, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const WhyChooseUs = () => {
  const { lang } = useLang();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { value: '500+', labelTh: 'อสังหาฯ ในระบบ', labelEn: 'Properties Listed', icon: <Home size={22} className="text-blue-600" /> },
    { value: '1,200+', labelTh: 'ลูกค้าที่ไว้วางใจ', labelEn: 'Happy Customers', icon: <ShieldCheck size={22} className="text-blue-600" /> },
    { value: '98%', labelTh: 'ความพึงพอใจ', labelEn: 'Satisfaction Rate', icon: <Star size={22} className="text-amber-500" /> },
    { value: '10+', labelTh: 'ปีประสบการณ์', labelEn: 'Years Experience', icon: <TrendingUp size={22} className="text-blue-600" /> },
  ];

  const features = [
    {
      icon: <ShieldCheck size={28} className="text-blue-600" />,
      titleTh: 'ปลอดภัย น่าเชื่อถือ',
      titleEn: 'Safe & Trusted',
      descTh: 'ทุกประกาศผ่านการตรวจสอบ พร้อมข้อมูลจริงจากเจ้าของ ไม่ผ่านนายหน้า',
      descEn: 'Every listing is verified with real data directly from owners.',
    },
    {
      icon: <Headphones size={28} className="text-blue-600" />,
      titleTh: 'ทีมงานดูแลตลอด',
      titleEn: '24/7 Support',
      descTh: 'ทีมที่ปรึกษาพร้อมช่วยเหลือทุกขั้นตอน ตั้งแต่ค้นหาจนปิดดีล',
      descEn: 'Our advisors help you through every step, from search to close.',
    },
    {
      icon: <TrendingUp size={28} className="text-blue-600" />,
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
    <section className="py-16 bg-transparent border-t border-gray-200/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-6 text-center hover:shadow-lg hover:border-blue-400/40 transition-all duration-300 group">
              <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{lang === 'th' ? stat.labelTh : stat.labelEn}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
            <ShieldCheck size={14} />
            {lang === 'th' ? 'ข้อดีของเรา' : 'Our Advantages'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {lang === 'th' ? 'ทำไมต้องเลือกเรา?' : 'Why Choose Us?'}
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            {lang === 'th'
              ? 'เราเป็นแพลตฟอร์มขายอสังหาฯ ที่เชื่อถือได้ พร้อมให้บริการครบวงจร'
              : 'We are a trusted real estate platform with full-service support.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-7 hover:shadow-lg hover:border-blue-400/40 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {lang === 'th' ? feature.titleTh : feature.titleEn}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {lang === 'th' ? feature.descTh : feature.descEn}
              </p>
            </div>
          ))}
        </div>


        {/* Testimonials */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {lang === 'th' ? 'เสียงจากลูกค้าของเรา' : 'What Our Customers Say'}
          </h3>
          <p className="text-gray-500 text-sm">
            {lang === 'th' ? 'รีวิวจริงจากผู้ซื้อที่ใช้บริการแล้ว' : 'Real reviews from verified buyers'}
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 md:p-10 text-center shadow-md">
            {/* Quote icon */}
            <Quote size={36} className="text-blue-200 mx-auto mb-4" />

            {/* Review text */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 italic">
              "{lang === 'th' ? current.textTh : current.textEn}"
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Name */}
            <p className="font-bold text-blue-600 text-sm">
              {lang === 'th' ? current.nameTh : current.nameEn}
            </p>
            <p className="text-xs text-gray-400">
              {lang === 'th' ? current.roleTh : current.roleEn}
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-gray-600"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-gray-600"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
