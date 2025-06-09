const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pawfinds', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User schema
const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: { type: String, unique: true },
  adoptedPets: Array,  // you can expand this as needed
});

const User = mongoose.model('User', userSchema);

// Route: Login or Register
app.post('/login', async (req, res) => {
  const { name, phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  try {
    let user = await User.findOne({ phoneNumber });

    if (user) {
      // User exists - login successful, send profile data
      return res.json({
        message: 'Login successful',
        user: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          adoptedPets: user.adoptedPets,
        },
      });
    } else {
      // User doesn't exist - require name to register
      if (!name) {
        return res.status(400).json({
          error:
            'User not found. Please provide your name to register your profile.',
        });
      }

      // Create new user
      user = new User({
        name,
        phoneNumber,
        adoptedPets: [],
      });

      await user.save();

      return res.json({
        message: 'Registration successful',
        user: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          adoptedPets: user.adoptedPets,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
