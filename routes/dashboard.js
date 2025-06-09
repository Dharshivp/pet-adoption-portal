
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Contribution = require('../models/Contribution');
const User = require('../models/User');

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Upload helper video
router.post('/upload', upload.single('video'), async (req, res) => {
  const { title } = req.body;
  const userId = req.session?.userId;

  const contribution = await Contribution.create({
    userId,
    title,
    videoUrl: `/uploads/${req.file.filename}`
  });

  res.redirect('/thankyou.html');
});

// Admin route to verify and award points
router.post('/verify/:id', async (req, res) => {
  const contribution = await Contribution.findById(req.params.id);
  if (!contribution) return res.status(404).send('Not found');




  contribution.status = 'approved';
  await contribution.save();

  const user = await User.findById(contribution.userId);
  user.points += contribution.points;
  await user.save();

  res.send('Verified and points added!');
});
  // Leaderboard Route
router.get('/leaderboard', async (req, res) => {
  const topUsers = await User.find().sort({ points: -1 }).limit(10);
  res.json(topUsers);
});

module.exports = router;
