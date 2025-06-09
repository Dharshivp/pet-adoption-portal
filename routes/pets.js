const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// Get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// Search pets by query (type, breed, name, or location)
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const pets = await Pet.find({
      $or: [
        { type: new RegExp(query, 'i') },
        { breed: new RegExp(query, 'i') },
        { name: new RegExp(query, 'i') },
        { location: new RegExp(query, 'i') }, // ✅ Added location search
      ],
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet details' });
  }
});

// Add a new pet (for admin use)
router.post('/', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add pet' });
  }
});

// 1. Route to submit a pet for adoption (for users who want to give up their pet)
router.post('/give', async (req, res) => {
  try {
    const { petName, petBreed, petAge, reason, reclaim } = req.body;

    // Create a new pet document
    const pet = new Pet({
      name: petName,
      breed: petBreed,
      age: petAge,
      reasonForGivingUp: reason,
      reclaimAvailable: reclaim,
    });

    // Save pet details in the database
    await pet.save();

    res.json({ success: true, message: 'Pet successfully submitted for adoption.' });
  } catch (err) {
    console.error("Error in giving up pet:", err);
    res.status(500).json({ success: false, message: 'Failed to submit pet for adoption.' });
  }
});

module.exports = router;


