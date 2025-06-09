const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

// Submit adoption form
router.post('/', async (req, res) => {
  const { name, email, phone, address, paymentId, petId } = req.body;

  try {
    // Find the pet
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }

    // Mark the pet as adopted
    pet.isAdopted = true;
    await pet.save();

    // Save the adoption info
    const adoption = new Adoption({
      name,
      email,
      phone,
      address,
      paymentId,
      pet: petId,
      adoptedAt: new Date()
    });

    await adoption.save();

    res.json({ success: true, adoption });
  } catch (err) {
    console.error("Adoption error:", err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;

