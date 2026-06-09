const t = {
  // ===== Header =====
  nav: {
    home:       { th: 'หน้าแรก',       en: 'Home' },
    collection: { th: 'คอลเลกชัน',    en: 'The Collection' },
    contact:    { th: 'ติดต่อเรา',     en: 'Contact' },
    bookTour:   { th: 'นัดชมบ้าน VIP', en: 'Book VIP Tour' },
  },

  // ===== Hero =====
  hero: {
    badge:    { th: 'คุณภาพชีวิตระดับพรีเมียม คลอง 3',          en: 'Prestigious Living in Khlong 3' },
    title1:   { th: 'สัมผัสความหรูหรา',                         en: 'Discover Luxury Living in Rangsit:' },
    title2:   { th: 'ในทุกพื้นที่ของบ้าน',                       en: 'The Renovated Collection' },
    subtitle: {
      th: 'คัดสรร 5 หลังพิเศษ พร้อมอยู่ทันที รีโนเวทใหม่ทั้งหลังด้วยวัสดุพรีเมียม ที่สุดของการอยู่อาศัยในหมู่บ้าน ไอลีฟทาวน์ รังสิต คลอง 3',
      en: 'Experience our curated selection of 5 exclusive, move-in ready residences. Redesigned and upgraded for those who demand the exceptional.'
    },
    btnExplore: { th: 'ชมคอลเลกชัน',  en: 'Explore Collection' },
    btnContact: { th: 'ติดต่อเจ้าหน้าที่', en: 'Contact Agent' },
    scroll:     { th: 'เลื่อนลง',       en: 'Scroll' },
  },

  // ===== Showcase =====
  showcase: {
    label:    { th: 'คัดสรรเป็นพิเศษ',                          en: 'Curated Selection' },
    heading:  { th: 'บ้านที่เราภูมิใจนำเสนอ',                    en: 'Featured Properties' },
    desc: {
      th: '5 หลังที่แตกต่าง 5 สไตล์ความหรูหรา ทุกหลังผ่านการรีโนเวทอย่างพิถีพิถันด้วยวัสดุระดับพรีเมียม ระบบ Smart Home และการออกแบบเฉพาะตัว',
      en: 'Five distinct visions of luxury. Each residence in our collection has been meticulously renovated with premium materials, smart home capabilities, and bespoke design elements.'
    },
  },

  // ===== PropertyCard =====
  card: {
    views:   { th: 'เข้าชม',       en: 'Views' },
    residency: { th: 'บ้านหลังที่', en: 'Residency' },
    sqm:     { th: 'ตร.ม.',        en: 'sq.m' },
    bed:     { th: 'นอน',          en: 'Bed' },
    bath:    { th: 'น้ำ',          en: 'Bath' },
    kit:     { th: 'ครัว',          en: 'Kit' },
    viewBtn: { th: 'ดูรายละเอียด',  en: 'View Details' },
  },

  // ===== PropertyModal =====
  modal: {
    gallery:       { th: 'แกลเลอรี',              en: 'Gallery' },
    virtualTour:   { th: 'วีดีโอโครงการ',         en: 'Property Video' },
    tourPlaceholder: { th: 'ไม่มีวีดีโอสำหรับโครงการนี้', en: 'No video available for this property' },
    highlights:    { th: 'จุดเด่นของบ้าน',          en: 'Property Highlights' },
    requestTour:   { th: 'นัดชมบ้านส่วนตัว',       en: 'Request a Private Tour' },
    yourName:      { th: 'ชื่อของคุณ',              en: 'Your Name' },
    phone:         { th: 'เบอร์โทรศัพท์',           en: 'Phone Number' },
    sendRequest:   { th: 'ส่งคำขอนัดชม',           en: 'Send Request' },
  },

  // ===== Footer =====
  footer: {
    tagline: {
      th: 'บ้านรีโนเวทพรีเมียมในหมู่บ้าน ไอลีฟทาวน์ รังสิต คลอง 3 สร้างมาตรฐานใหม่ของการอยู่อาศัยชานเมือง',
      en: 'Exclusive renovated properties in Rangsit Khlong 3. Setting a new standard for luxury suburban living.'
    },
    contactAgent: { th: 'ติดต่อเจ้าหน้าที่',  en: 'Contact Agent' },
    location:     { th: 'ที่ตั้ง',              en: 'Location' },
    amenities:    { th: 'สิ่งอำนวยความสะดวก',  en: 'Village Amenities' },
    amenityList: {
      th: ['• รปภ. 24 ชั่วโมง', '• คลับเฮาส์', '• สระว่ายน้ำขนาดโอลิมปิก', '• สวนสาธารณะส่วนตัว', '• ระบบ Smart Access Control'],
      en: ['• 24/7 Premium Security', '• Exclusive Clubhouse', '• Olympic-size Swimming Pool', '• Private Access Park', '• Smart Access Control']
    },
    copyright: {
      th: `© ${new Date().getFullYear()} iLeaf Town Luxury Showcase. สงวนสิทธิ์ทุกประการ`,
      en: `© ${new Date().getFullYear()} iLeaf Town Luxury Showcase. All rights reserved.`
    },
    privacy:  { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
    terms:    { th: 'ข้อกำหนดการใช้งาน',     en: 'Terms of Service' },
    address: {
      th: 'หมู่บ้าน ไอลีฟทาวน์ รังสิต คลอง 3\nประชาธิปัตย์, ธัญบุรี\nปทุมธานี 12130',
      en: 'iLeaf Town Rangsit Khlong 3\nPrachathipat, Thanyaburi\nPathum Thani 12130, Thailand'
    }
  },

  // ===== Floor Plans Section =====
  floorPlans: {
    heading:  { th: 'แผนผังภายในบ้าน', en: 'Luxury Floor Plans' },
    subtitle: { 
      th: 'การจัดวางที่เน้นพื้นที่ใช้สอยกว้างขวางและลงตัวในทุกตารางเมตร', 
      en: 'Thoughtfully designed layouts maximizing space and comfort in every square meter.' 
    },
    floor1: { 
      title: { th: 'แปลนบ้านชั้นที่ 1', en: '1st Floor Plan' },
      desc:  { 
        th: 'พื้นที่ชั้นล่างเน้นความโปร่งโล่งและฟังก์ชันที่ครบถ้วนสำหรับการใช้ชีวิตประจำวัน', 
        en: 'The ground floor emphasizes openness and complete functionality for daily living.' 
      },
      rooms: {
        th: ['1 ห้องนอน (เหมาะสำหรับผู้สูงอายุ)', '1 ห้องน้ำ', '1 ห้องรับแขกขนาดใหญ่', '1 พื้นที่รับประทานอาหาร', '1 ห้องครัวอินเตอร์', 'พื้นที่ซักล้างด้านหลัง'],
        en: ['1 Bedroom (Elderly friendly)', '1 Bathroom', '1 Spacious Living Room', '1 Dining Area', '1 International Kitchen', 'Rear Washing Area']
      }
    },
    floor2: { 
      title: { th: 'แปลนบ้านชั้นที่ 2', en: '2nd Floor Plan' },
      desc:  { 
        th: 'พื้นที่พักผ่อนส่วนตัวที่ออกแบบอย่างเป็นสัดส่วนเพื่อความเป็นส่วนตัวสูงสุดของสมาชิกในบ้าน', 
        en: 'Private relaxation space designed with thoughtful proportions for maximum privacy.' 
      },
      rooms: {
        th: ['3 ห้องนอน (1 Master Bedroom)', '2 ห้องน้ำ', 'พื้นที่โถงทางเดินกว้างขวาง'],
        en: ['3 Bedrooms (1 Master Bedroom)', '2 Bathrooms', 'Spacious Hallway']
      }
    }
  },

  // ===== Location Section =====
  location: {
    heading:  { th: 'ทำเลที่ตั้งและสถานที่ใกล้เคียง', en: 'Prime Location & Connectivity' },
    subtitle: { 
      th: 'สะดวกสบายในทุกการเดินทาง ใกล้แหล่งไลฟ์สไตล์และสิ่งอำนวยความสะดวกครบครัน', 
      en: 'Experience ultimate convenience with easy access to lifestyle hubs and essential amenities.' 
    },
    shopping: {
      title: { th: 'ห้างสรรพสินค้า', en: 'Shopping & Lifestyle' },
      list:  { 
        th: ['ฟิวเจอร์พาร์ครังสิต 7.5 กม', 'โลตัสคลองสี่ 2.3 กม', 'Market Village 2.8 กม', 'ตลาดดีดีมาเช่ 1.6 กม'], 
        en: ['Future Park Rangsit 7.5 km', 'Lotus\'s Khlong Si 2.3 km', 'Market Village 2.8 km', 'DD Marche Market 1.6 km'] 
      }
    },
    education: {
      title: { th: 'สถานศึกษา', en: 'Education' },
      list:  { 
        th: ['โรงเรียนโชคชัยรังสิต 1.9 กม', 'โรงเรียนแย้มสะอาดรังสิต 5.2 กม'], 
        en: ['Chokchai Rangsit School 1.9 km', 'Yam Sa-at Rangsit School 5.2 km'] 
      }
    },
    connectivity: {
      title: { th: 'จุดเชื่อมต่อการเดินทาง', en: 'Connectivity' },
      list: {
        th: ['ทางขึ้นมอเตอร์เวย์ด่านธัญบุรี 5.5 กม'],
        en: ['Thanyaburi Motorway Entrance 5.5 km']
      }
    },
    healthcare: {
      title: { th: 'โรงพยาบาล', en: 'Healthcare' },
      list:  { 
        th: ['โรงพยาบาลเปาโล รังสิต', 'โรงพยาบาลปทุมเวช'], 
        en: ['Paolo Hospital Rangsit', 'Pathumvech Hospital'] 
      }
    }
  },

  // ===== Property data translations =====
  properties: {
    'residency-1': {
      title:       { th: 'บ้านทาวน์เฮ้าส์ 2 ชั้น (หลังมุม)',   en: '2-Story Townhouse (Corner Unit)' },
      description: {
        th: 'เปิดจอง❗️มบ.ไอลีฟ ทาวน์ รังสิตคลอง 3🏡✨ ทำเลดี ติดถนนใหญ่ ไม่เข้าเส้นคลอง\n\n🚙เดินทางสะดวก ใกล้วงแหวนกาญจนาฯ ใกล้ทางยกระดับอุตราภิมุข ใกล้สนามบินดอนเมือง\n\n📍ที่ตั้ง : ถนนรังสิต-นครนายก คลอง 3 ต.บึงยี่โถ อ.ธัญบุรี จ.ปทุมธานี\n\n"ราคาดี ทำเลเยี่ยม คุ้มค่าทั้งการลงทุนและอยู่อาศัย!"',
        en: 'Now open for booking! iLeaf Town Rangsit Klong 3. Prime location on the main road, no need to enter the canal lanes.\n\nConvenient transportation: Close to Kanchanaphisek Ring Road, Don Mueang Tollway, and Don Mueang Airport.\n\nLocation: Rangsit-Nakhon Nayok Rd, Klong 3, Bueng Yitho, Thanyaburi, Pathum Thani.\n\n"Great price, excellent location, worth both investment and residential living!"'
      },
      highlights: {
        th: [
          'ทาวน์โฮมหลังมุม หันหน้าทิศใต้ เนื้อที่ 27 ตร.ว.',
          'พิเศษ จอง + ยื่นสินเชื่อ ในเดือน มิ.ย. 69 รับส่วนลด 100,000 บ.',
          'รปภ., CCTV 24 ชม., สวนสาธารณะ, Easy Pass เข้าออก',
          'ทำเลติดถนนใหญ่ ใกล้ BTS สายสีเขียว สถานีคลอง 3'
        ],
        en: [
          'Corner unit townhome, facing South, land size 27 sq.w.',
          'Special: Book + Apply for loan in June \'26, get a 100,000 THB discount',
          '24h Security, CCTV, Central Park, and Easy Pass access',
          'Main road location near BTS Green Line (Klong 3 Station)'
        ]
      }
    },
    'residency-2': {
      title:       { th: 'มินิมอล เฮเว่น',            en: 'Minimalist Haven' },
      description: {
        th: 'สวรรค์แห่งความสงบท่ามกลางเมือง ออกแบบสำหรับผู้ที่ชื่นชอบเส้นสายเรียบง่าย พื้นผิวจากธรรมชาติ และไลฟ์สไตล์ที่ไร้ความยุ่งเหยิง',
        en: 'A sanctuary of peace in the bustling city. The Minimalist Haven is designed for those who appreciate clean lines, natural textures, and a clutter-free lifestyle.'
      },
      highlights: {
        th: ['ดีไซน์แรงบันดาลใจจากญี่ปุ่น', 'เฟอร์นิเจอร์ Built-in ไม้จริง', 'จัดสวนสไตล์ Zen Garden'],
        en: ['Minimalist Japanese-inspired design', 'Built-in wooden furniture', 'Zen garden landscaping']
      }
    },
    'residency-3': {
      title:       { th: 'เออร์เบิน โอเอซิส',          en: 'Urban Oasis' },
      description: {
        th: 'ออกแบบเพื่อครอบครัวที่ชอบจัดงานเลี้ยง พื้นที่เปิดโล่งที่เชื่อมต่อภายในบ้านกับพื้นที่พักผ่อนกลางแจ้งได้อย่างลงตัว',
        en: 'Designed for families who love to entertain. The Urban Oasis features an open floor plan that seamlessly connects indoor and outdoor luxury living spaces.'
      },
      highlights: {
        th: ['ห้องนอนใหญ่พร้อม Walk-in Closet', 'ดาดฟ้าสำหรับปาร์ตี้กลางแจ้ง', 'ห้องนั่งเล่นเพดานสูง'],
        en: ['Expanded master suite with walk-in closet', 'Outdoor entertainment deck', 'High ceiling living area']
      }
    },
    'residency-4': {
      title:       { th: 'อาร์ต เดโค ดรีม',            en: 'The Art Deco Dream' },
      description: {
        th: 'สัมผัสความอลังการราวโรงแรมหรู รีโนเวทในสไตล์ Art Deco ด้วยรูปทรงเรขาคณิตที่โดดเด่นและสีสันที่เปี่ยมไปด้วยความหรูหรา',
        en: 'Step into glamour. This art-deco inspired renovation brings hotel-like luxury to iLeaf Town, featuring bold geometries and rich, decadent colors.'
      },
      highlights: {
        th: ['อุปกรณ์สีทองและทองเหลืองสุดหรู', 'ผนังกำมะหยี่ออกแบบพิเศษ', 'โคมไฟ Chandelier ระดับดีไซเนอร์'],
        en: ['Luxurious gold and brass fixtures', 'Custom velvet paneling', 'Designer chandeliers included']
      }
    },
    'residency-5': {
      title:       { th: 'สแกนดิเนเวียน รีทรีต',       en: 'Scandinavian Retreat' },
      description: {
        th: 'สว่าง โปร่ง และอบอุ่นอย่างเหลือเชื่อ ใช้แสงธรรมชาติเต็มที่พร้อมโทนไม้อ่อนสร้างบรรยากาศบ้านที่สมบูรณ์แบบสำหรับครอบครัว',
        en: 'Bright, airy, and incredibly welcoming. The Scandinavian Retreat maximizes natural light and utilizes warm wood tones to create the perfect family home.'
      },
      highlights: {
        th: ['บรรยากาศ Hygge อบอุ่นเป็นกันเอง', 'พื้นไม้โอ๊ค สีอ่อน', 'หน้าต่างกระจกประหยัดพลังงาน'],
        en: ['Cozy hygge atmosphere', 'Light oak flooring', 'Energy-efficient window upgrades']
      }
    },
  }
};

export default t;
