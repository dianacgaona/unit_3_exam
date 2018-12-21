const express = require('express');
const router = express.Router();
const {
  getAllHabitats,
  getHabitat,
  addHabitat,
} = require('../db/queries/habitatQueries.js');

router.get('/', getAllHabitats);
router.get('/:id', getHabitat);
router.post('/', addHabitat);

module.exports = router;
