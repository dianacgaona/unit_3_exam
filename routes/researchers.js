const express = require('express');
const router = express.Router();
const {
  getAllResearchers,
  getResearcher,
  addResearcher,
  editResearcher,
  deleteResearcher,
} = require('../db/queries/researcherQueries.js');

router.get('/', getAllResearchers);
router.get('/:id', getResearcher);
router.post('/', addResearcher);
router.put('/:id', editResearcher);
router.delete('/:id', deleteResearcher);

module.exports = router;
