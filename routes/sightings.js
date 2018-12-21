const express = require('express');
const router = express.Router();
const {
  getAllSightings,
  getSpeciesSightings,
  getSightingsForResearcher,
  getSightingsForHabitat,
  addSighting,
  deleteSighting,
} = require('../db/queries/sightingQueries.js');

router.get('/', getAllSightings);
router.get('/species/:id', getSpeciesSightings);
router.get('/researchers/:id', getSightingsForResearcher);
router.get('/habitats/:id', getSightingsForHabitat);
router.post('/', addSighting);
router.delete('/:id', deleteSighting);

module.exports = router;
