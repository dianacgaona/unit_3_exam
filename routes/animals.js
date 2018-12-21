const express = require('express');
const router = express.Router();
const {
  getAllAnimals,
  getAnimal,
  addAnimal,
  editAnimal,
  deleteAnimal,
} = require('../db/queries/animalQueries.js');

router.get('/', getAllAnimals);
router.get('/:id', getAnimal);
router.post('/', addAnimal);
router.put('/:id', editAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;
