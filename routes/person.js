const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single person by ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new person
router.post('/', async (req, res) => {
  try {
    const person = new Person({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile
    });

    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update person
router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE person
router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);

    if (!deletedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json({ message: 'Person deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
