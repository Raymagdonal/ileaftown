const mongoose = require('mongoose');
require('dotenv').config();

const TranslationSchema = new mongoose.Schema({
  key: String,
  th: mongoose.Schema.Types.Mixed,
  en: mongoose.Schema.Types.Mixed
});
const Translation = mongoose.model('Translation', TranslationSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB.');

  const updates = [
    {
      key: 'hero.badge',
      th: 'ตลาดซื้อขายบ้านมือสองและโครงการใหม่',
      en: 'Real Estate Classifieds Marketplace'
    },
    {
      key: 'hero.title1',
      th: 'ค้นหาแหล่งซื้อขายอสังหาฯ',
      en: 'Find the Perfect Property'
    },
    {
      key: 'hero.title2',
      th: 'ที่คุณต้องการ',
      en: 'for You'
    },
    {
      key: 'hero.subtitle',
      th: 'รวมประกาศบ้านเดี่ยว ทาวน์โฮม คอนโด บนทำเลศักยภาพ ติดต่อผู้ขายได้ทันที สะดวก รวดเร็ว',
      en: 'Explore single houses, townhomes, and condos on best locations. Fast contact.'
    }
  ];

  for (const item of updates) {
    await Translation.findOneAndUpdate(
      { key: item.key },
      { th: item.th, en: item.en },
      { upsert: true, new: true }
    );
    console.log(`Updated key: ${item.key}`);
  }
  
  await mongoose.disconnect();
  console.log('Done.');
}
run().catch(console.error);
