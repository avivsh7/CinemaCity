const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Subscriptions = require('./subscriptionsModel')


const app = require('./app') // new
require('./movies')  // new

const port = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/CinemaCity', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});


// SCHEMAS:


  // User Subscription to a movie
  app.post('/subscriptions', async (req, res) => {
    const { user, movie, date } = req.body;
  
    if (!user || !movie || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newSubscription = new Subscriptions({
        user,
        movie,
        date
      });
      await newSubscription.save();
      res.status(201).json({ message: 'Subscribed successfully', subscription: newSubscription });
    } catch (error) {
      res.status(500).json({ message: 'Failed to subscribe', error });
    }
  });

 // Fetching all subscriptions
app.get('/subscriptions', async (req, res) => {
  try {
    const subscriptions = await Subscriptions.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subscriptions', error });
  }
});

  
  

// User Schema
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  name: String,
  email: String,
  city: String
},{collection: 'SystemUsers'});

const User = mongoose.model('User', userSchema);

// Member Routes
// Add a new member
app.post('/members/addMember', async (req, res) => {
  const { name, email, city } = req.body;

  if (!name || !email || !city) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMember = new User({
      name,
      email,
      city
    });
    await newMember.save();
    res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add member', error });
  }
});


// Update member
app.put('/editmember/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, city } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, city },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member updated successfully', member: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error });
  }
});

// Delete member and their subscriptions
app.delete('/allmembers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete related subscriptions
    await Subscriptions.deleteMany({ user: user.name });

    res.status(200).json({ message: 'Member and related subscriptions deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member and subscriptions', error });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare plain text passwords directly
  if (password === user.password) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get("/allmembers", async (req, res) => {
  const { user } = req.query;

  try {
    let users;
    if (user) {
      // Fetch only the specified user
      users = await User.find({ name: user });
    } else {
      // Fetch all users
      users = await User.find({});
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});




// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports = app;