const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3002;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongodb:27017/patientdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Define Patient schema
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
});

const Patient = mongoose.model('Patient', patientSchema);

// Search patient route
app.get('/patients/search', (req, res) => {
  const { name } = req.query;
  Patient.find({ name: new RegExp(name, 'i') }) // Case-insensitive search
    .then(patients => res.json(patients))
    .catch(err => res.status(400).send(err));
});

// Start server
app.listen(port, () => {
  console.log(`Patient Search Service listening on port ${port}`);
});