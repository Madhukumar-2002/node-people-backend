const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personRoutes = require('./routes/person');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Correct body parsing (IMPORTANT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/peopleDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/person', personRoutes);

// Test route (optional but useful)
app.get('/', (req, res) => {
  res.send('People Management API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
