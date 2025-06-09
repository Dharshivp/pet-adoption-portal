const mongoose = require('mongoose');

// Vaccination schema
const VaccinationSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Medical record schema (optional, for advanced pet history)
const MedicalRecordSchema = new mongoose.Schema({
  condition: { type: String, required: true },
  treatment: { type: String },
  date: { type: Date, default: Date.now }
});

// Main pet schema
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // dog, cat, rabbit, etc.
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String }, // City or shelter location
  vaccinations: [VaccinationSchema],
  medicalHistory: [MedicalRecordSchema], // Optional advanced feature
  media: [{ type: String }],
  adopted: { type: Boolean, default: false },
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true, default: 0 }

},


 {
  timestamps: true,
});

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  reasonForGivingUp: { type: String, required: true },
  reclaimAvailable: { type: Boolean, default: false }, // Whether the owner can reclaim the pet later
  dateSubmitted: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Pet', PetSchema);
