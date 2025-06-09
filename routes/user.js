const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /user/login - Save user info to DB
router.post('/login', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).send('Name and phone are required');
  }

  try {
    // Check if user already exists by phone
    let user = await User.findOne({ phone });

    if (!user) {
      // Create new user
      user = new User({ name, phone });
      await user.save();
    }

    // Redirect to profile page or send success message
    // For now, just send a success message (you can redirect later)
    res.send(`
      <h2>Welcome, ${user.name}!</h2>
      <p>Your phone: ${user.phone}</p>
      <p><a href="/profile.html">Go to your profile</a></p>
    `);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error, try again later.');
  }
});

module.exports = router;
