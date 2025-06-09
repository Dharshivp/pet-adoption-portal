const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  paymentId: String,
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
  adoptedAt: Date
});

module.exports = mongoose.model('Adoption', adoptionSchema);

