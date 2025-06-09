const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const Pet = require('./models/Pet'); // Assuming you have a Pet model
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const app = express();
const adoptionRoutes = require('./routes/adoption');
const { Server } = require('http');
app.use('/api', profileRoutes);
app.use('/adopt', adoptionRoutes);
app.use('/dashboard', dashboardRoutes);
const port = 5000
;
app.use('/user', userRoutes);
app.use(session({
  secret: 'your-secret-key', // Choose a secure key
  resave: false,
  saveUninitialized: true,
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'pawfinds-secret',
  resave: false,
  saveUninitialized: true
}));











mongoose.connect('mongodb://127.0.0.1:27017/pawfinds', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.use('/api/pets', require('./routes/pets'));
app.use('/api/adopt', require('./routes/adoption'));
app.use('/user', require('./routes/user'));

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/submitpet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'submitpet.html'));
});


const PetSchema = new mongoose.Schema({
  name: String,
  age: String,
  breed: String,
  description: String
});

// const Pet = mongoose.model('Pet', PetSchema);

// POST Route to handle form data











































const addPetsData = async () => {
  try {
    const puppies = [
      { 
        name: 'Buddy', breed: 'Golden Retriever', species: 'Dog', age: 2, 
        location: 'California', vaccinationDates: ['2023-02-15'], 
        description: 'Buddy is a friendly Golden Retriever who loves playing outside.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUYX5TRoiXLGB5nN3Nbun5xikTeEuVPkU-w&s', type: 'Dog' 
      },
      { 
        name: 'Max', breed: 'German Shepherd', species: 'Dog', age: 3, 
        location: 'Texas', vaccinationDates: ['2022-05-12'], 
        description: 'Max is an energetic German Shepherd who loves to run.',
        image: 'https://coastalgsr.org/graphics/profiles_2/21632.jpg', type: 'Dog' 
      },
      { 
        name: 'Bella', breed: 'Bulldog', species: 'Dog', age: 1, 
        location: 'Florida', vaccinationDates: ['2023-08-20'], 
        description: 'Bella is a calm and affectionate Bulldog.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Bulldog_inglese.jpg', type: 'Dog' 
      },
    ];

    const cats = [
      { 
        name: 'Whiskers', breed: 'Siamese', species: 'Cat', age: 2, 
        location: 'New York', vaccinationDates: ['2023-02-10'], 
        description: 'Whiskers is a curious Siamese cat.',
        image: 'https://preview.redd.it/955h4hhrz2781.jpg?width=1080&crop=smart&auto=webp&s=cc0e622bd4ac22fef887b8a77130014da81fbec0', type: 'Cat' 
      },
      { 
        name: 'Luna', breed: 'Maine Coon', species: 'Cat', age: 4, 
        location: 'California', vaccinationDates: ['2022-09-15'], 
        description: 'Luna is a gentle Maine Coon cat.',
        image: 'https://preview.redd.it/my-boy-is-2-years-old-and-still-quite-small-v0-mlvfk4qthced1.jpg?width=1080&crop=smart&auto=webp&s=f8ac964269c6524a37d69a2ed4be6e5cfda5b41a', type: 'Cat' 
      },
      { 
        name: 'Mittens', breed: 'Persian', species: 'Cat', age: 1, 
        location: 'Texas', vaccinationDates: ['2023-03-01'], 
        description: 'Mittens is a playful Persian cat.',
        image: 'https://preview.redd.it/1-5-year-old-persian-ginger-male-cat-looking-for-home-love-v0-1q5xlsfp27ed1.jpg?width=1080&crop=smart&auto=webp&s=ebfabf773dd7622737948416cbc614c06cd0bc4c', type: 'Cat' 
      },
    ];

    const fishes = [
      { 
        name: 'Goldie', breed: 'Goldfish', species: 'Fish', age: 1, 
        location: 'Aquarium', vaccinationDates: ['2024-01-01'], 
        description: 'Goldie is a bright and lively Goldfish.',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2021/4/BO/NU/AQ/12128902/product-jpeg-1000x1000.jpg', type: 'Fish' 
      },
      { 
        name: 'Bubbles', breed: 'Betta Fish', species: 'Fish', age: 2, 
        location: 'Aquarium', vaccinationDates: ['2023-12-15'], 
        description: 'Bubbles is a colorful Betta fish.',
        image: 'https://cdn.fastpixel.io/fp/ret_img+v_3334+w_1520+h_887+q_lossy+to_webp/spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/bettasource.com/wp-content/uploads/betta-fish-years-to-human-years.jpeg', type: 'Fish' 
      },
    ];

    const parrots = [
      { 
        name: 'Polly', breed: 'Macaw', species: 'Parrot', age: 5, 
        location: 'Florida', vaccinationDates: ['2023-07-20'], 
        description: 'Polly is a vibrant Macaw parrot.',
        image: 'https://cdn.sanity.io/images/xhhnkk4g/production/ef47d32f362ec91e65afd53eb31d399f9727fe58-1080x720.png?w=3840&q=65&fit=clip&auto=format', type: 'Parrot' 
      },
      { 
        name: 'Chirpy', breed: 'Cockatiel', species: 'Parrot', age: 2, 
        location: 'California', vaccinationDates: ['2023-09-15'], 
        description: 'Chirpy is a chatty Cockatiel parrot.',
        image: 'https://www.parrotfunzone.com/images/articles/species/pic_cockatiel.gif', type: 'Parrot' 
      },
    ];

    const rabbits = [
      { 
        name: 'Thumper', breed: 'Himalayan', species: 'Rabbit', age: 3, 
        location: 'New York', vaccinationDates: ['2022-11-10'], 
        description: 'Thumper is a playful and cute Himalayan rabbit.',
        image: 'https://cosleyzoo.org/wp-content/uploads/Himalayan-Rabbit-600x796.jpg', type: 'Rabbit' 
      },
      { 
        name: 'Snowball', breed: 'Angora', species: 'Rabbit', age: 2, 
        location: 'Texas', vaccinationDates: ['2023-02-01'], 
        description: 'Snowball is a fluffy Angora rabbit.',
        image: 'https://static.wixstatic.com/media/1f5aed_56325349ff2e4d3c85c4a551424dc045~mv2.jpg/v1/fill/w_525,h_581,al_c,lg_1,q_80,enc_avif,quality_auto/1f5aed_56325349ff2e4d3c85c4a551424dc045~mv2.jpg', type: 'Rabbit' 
      },
    ];

    const allPets = [...puppies, ...cats, ...fishes, ...parrots, ...rabbits];

    await Pet.insertMany(allPets);
    console.log('All pets saved successfully');
  } catch (err) {
    console.error('Error saving pets:', err);
  }
};

addPetsData();

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
