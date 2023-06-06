const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;
mongoose.set('strictQuery', false);

// Set up CORS middleware
app.use(cors());
app.use(express.static('images'));
// Connect to MongoDB
mongoose.connect('mongodb://localhost/Chinpokomon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Chinpokomon schema and model
const chinpokomonSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  imageUrl: String,
});

const Chinpokomon = mongoose.model('Chinpokomon', chinpokomonSchema);

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  usersName: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());

// API endpoint for user login
app.post('/api/login', handleLogin);

// API endpoint for user signup
app.post('/api/signup', handleSignup);

// API endpoint for fetching Chinpokomons
app.get('/api/chinpokomons', fetchChinpokomons);

// API endpoint for updating a Chinpokomon
app.put('/api/chinpokomons/:id', updateChinpokomon);

// API endpoint for deleting a Chinpokomon
app.delete('/api/chinpokomons/:id', deleteChinpokomon);

// Function for handling user login
async function handleLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication successful
    res.json({ username: user.username, usersName: user.usersName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log in' });
  }
}

// Function for handling user signup
async function handleSignup(req, res) {
  const { username, password, usersName } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      usersName,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
}

// Function for fetching Chinpokomons
async function fetchChinpokomons(req, res) {
  try {
    const chinpokomons = await Chinpokomon.find();
    res.json(chinpokomons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

// Function for updating a Chinpokomon
async function updateChinpokomon(req, res) {
  try {
    const { id } = req.params;
    const updatedChinpokomon = await Chinpokomon.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedChinpokomon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update Chinpokomon' });
  }
}

// Function for deleting a Chinpokomon
async function deleteChinpokomon(req, res) {
  try {
    const { id } = req.params;
    await Chinpokomon.findByIdAndDelete(id);
    res.json({ message: 'Chinpokomon deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete Chinpokomon' });
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
