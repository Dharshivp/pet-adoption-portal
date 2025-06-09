const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); // files saved in public/uploads

// Get adopted pets for profile page
router.get('/adoptedPets', async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username }).populate('adoptedPets');
  if (!user) return res.json([]);
  res.json(user.adoptedPets);
});

// Upload pet memory
router.post('/uploadMemory', upload.single('memory'), async (req, res) => {
  const { petId } = req.body;
  const filePath = `/uploads/${req.file.filename}`;
  await Pet.findByIdAndUpdate(petId, { $push: { memories: filePath } });
  res.redirect('/profile.html');
});

module.exports = router;
