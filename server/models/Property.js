const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyId: { type: String, required: true, unique: true }, // e.g. "prop-1"
  houseNumber: String,
  title: String,
  description: String,
  price: String,
  originalPrice: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  kitchens: Number,
  coverImage: String,
  gallery: [String],
  videoUrl: String, // Public URL to the uploaded video
  floorPlan1: String, // Ground Floor Plan Image URL
  floorPlan2: String, // Upper Floor Plan Image URL
  views: { type: Number, default: 0 },
  highlights: [String],
  hideFloorPlans: { type: Boolean, default: false },
  hideVideo: { type: Boolean, default: false }
});

module.exports = mongoose.model('Property', propertySchema);
