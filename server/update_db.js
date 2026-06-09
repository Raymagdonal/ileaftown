const mongoose = require('mongoose');
require('dotenv').config();

const PropertySchema = new mongoose.Schema({
  propertyId: String,
  houseNumber: String,
  title: String,
  price: String,
  originalPrice: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  kitchens: Number,
  coverImage: String,
  gallery: [String],
  highlights: [String],
  description: String
}, { strict: false });

const Property = mongoose.model('Property', PropertySchema);

const TranslationSchema = new mongoose.Schema({
  key: String,
  th: String,
  en: String
});

const Translation = mongoose.model('Translation', TranslationSchema);

const newPropertyData = {
  houseNumber: "100/149",
  title: "บ้านทาวน์เฮ้าส์ 2 ชั้น (หลังมุม)",
  price: "฿2,690,000",
  originalPrice: "฿2,790,000",
  area: 108,
  bedrooms: 4,
  bathrooms: 3,
  kitchens: 1,
  highlights: [
    "ทาวน์โฮมหลังมุม หันหน้าทิศใต้ เนื้อที่ 27 ตร.ว.",
    "พิเศษ จอง + ยื่นสินเชื่อ ในเดือน มิ.ย. 69 รับส่วนลด 100,000 บ.",
    "รปภ., CCTV 24 ชม., สวนสาธารณะ, Easy Pass เข้าออก",
    "ทำเลติดถนนใหญ่ ใกล้ BTS สายสีเขียว สถานีคลอง 3"
  ],
  description: "เปิดจอง❗️มบ.ไอลีฟ ทาวน์ รังสิตคลอง 3🏡✨ ทำเลดี ติดถนนใหญ่ ไม่เข้าเส้นคลอง\n\n🚙เดินทางสะดวก ใกล้วงแหวนกาญจนาฯ ใกล้ทางยกระดับอุตราภิมุข ใกล้สนามบินดอนเมือง\n\n📍ที่ตั้ง : ถนนรังสิต-นครนายก คลอง 3 ต.บึงยี่โถ อ.ธัญบุรี จ.ปทุมธานี\n\n\"ราคาดี ทำเลเยี่ยม คุ้มค่าทั้งการลงทุนและอยู่อาศัย!\""
};

const newTranslationData = [
  {
    key: "properties.residency-1.title",
    th: "บ้านทาวน์เฮ้าส์ 2 ชั้น (หลังมุม)",
    en: "2-Story Townhouse (Corner Unit)"
  },
  {
    key: "properties.residency-1.description",
    th: "เปิดจอง❗️มบ.ไอลีฟ ทาวน์ รังสิตคลอง 3🏡✨ ทำเลดี ติดถนนใหญ่ ไม่เข้าเส้นคลอง\n\n🚙เดินทางสะดวก ใกล้วงแหวนกาญจนาฯ ใกล้ทางยกระดับอุตราภิมุข ใกล้สนามบินดอนเมือง\n\n📍ที่ตั้ง : ถนนรังสิต-นครนายก คลอง 3 ต.บึงยี่โถ อ.ธัญบุรี จ.ปทุมธานี\n\n\"ราคาดี ทำเลเยี่ยม คุ้มค่าทั้งการลงทุนและอยู่อาศัย!\"",
    en: "Now open for booking! iLeaf Town Rangsit Klong 3. Prime location on the main road, no need to enter the canal lanes.\n\nConvenient transportation: Close to Kanchanaphisek Ring Road, Don Mueang Tollway, and Don Mueang Airport.\n\nLocation: Rangsit-Nakhon Nayok Rd, Klong 3, Bueng Yitho, Thanyaburi, Pathum Thani.\n\n\"Great price, excellent location, worth both investment and residential living!\" "
  },
  {
    key: "properties.residency-1.highlights",
    th: JSON.stringify([
      "ทาวน์โฮมหลังมุม หันหน้าทิศใต้ เนื้อที่ 27 ตร.ว.",
      "พิเศษ จอง + ยื่นสินเชื่อ ในเดือน มิ.ย. 69 รับส่วนลด 100,000 บ.",
      "รปภ., CCTV 24 ชม., สวนสาธารณะ, Easy Pass เข้าออก",
      "ทำเลติดถนนใหญ่ ใกล้ BTS สายสีเขียว สถานีคลอง 3"
    ]),
    en: JSON.stringify([
      "Corner unit townhome, facing South, land size 27 sq.w.",
      "Special: Book + Apply for loan in June '26, get a 100,000 THB discount",
      "24h Security, CCTV, Central Park, and Easy Pass access",
      "Main road location near BTS Green Line (Klong 3 Station)"
    ])
  }
];

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // 1. Update Property Collection
    const updatedProp = await Property.findOneAndUpdate(
      { propertyId: "residency-1" },
      { $set: newPropertyData },
      { new: true, upsert: true }
    );
    console.log('Successfully updated property in database:', updatedProp.propertyId);

    // 2. Update Translations Collection
    for (const trans of newTranslationData) {
      let thVal = trans.th;
      let enVal = trans.en;
      
      // Parse arrays if keys are highlights
      if (trans.key.includes('highlights')) {
        thVal = JSON.parse(trans.th);
        enVal = JSON.parse(trans.en);
      }
      
      await Translation.findOneAndUpdate(
        { key: trans.key },
        { th: thVal, en: enVal },
        { new: true, upsert: true }
      );
    }
    console.log('Successfully updated translations in database.');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (err) {
    console.error('Error updating database:', err);
  }
}

run();
