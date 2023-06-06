const express = require('express');
const router = express.Router();
const Chinpokomon = require('../../models/Chinpokomon');

router.get('/', async (req, res) => {
  try {
    const chinpokomons = await Chinpokomon.find();
    res.json(chinpokomons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
