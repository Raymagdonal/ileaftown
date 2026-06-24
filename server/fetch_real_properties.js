const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Property = require('./models/Property');

const MONGODB_URI = "mongodb+srv://Raymagdonal:bleach4901@cluster0.psrkcic.mongodb.net/ileaf_town?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    const props = await Property.find({}).lean();
    console.log(`Fetched ${props.length} properties.`);

    // Map properties to clean frontend structure
    const cleanedProps = props.map(p => {
      return {
        id: p.propertyId || `residency-${p._id}`,
        propertyId: p.propertyId,
        houseNumber: p.houseNumber,
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice,
        area: p.area,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        kitchens: p.kitchens,
        views: p.views || 0,
        coverImage: p.coverImage,
        gallery: p.gallery || [],
        videoUrl: p.videoUrl,
        floorPlan1: p.floorPlan1,
        floorPlan2: p.floorPlan2,
        highlights: p.highlights || [],
        description: p.description,
        hideFloorPlans: p.hideFloorPlans || false,
        hideVideo: p.hideVideo || false
      };
    });

    const fileContent = `export const properties = ${JSON.stringify(cleanedProps, null, 2)};\n`;
    const targetPath = path.join(__dirname, '../src/data/properties.js');
    
    fs.writeFileSync(targetPath, fileContent, 'utf-8');
    console.log(`Successfully wrote database properties to ${targetPath}`);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
