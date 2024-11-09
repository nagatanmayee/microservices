const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Enable CORS for all origins (Allow requests from frontend)
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Allow specific headers
}));

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

// Add patient route
app.post('/patients/add', (req, res) => {
  const { name, age, address } = req.body;
  const newPatient = new Patient({ name, age, address });

  newPatient.save()
    .then(() => res.status(201).json({ message: 'Patient added successfully' }))
    .catch(err => res.status(400).send(err));
});

// Start server
app.listen(port, () => {
  console.log(`Patient Add Service listening on port ${port}`);
});