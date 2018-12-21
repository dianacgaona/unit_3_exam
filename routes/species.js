const express = require('express');
const router = express.Router();
const {
  getAllSpecies,
  getSpecies,
  addSpecies,
} = require('../db/queries/speciesQueries.js');

router.get('/', getAllSpecies);
router.get('/:id', getSpecies);
router.post('/', addSpecies);

module.exports = router;
