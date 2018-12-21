const express = require('express');
const router = express.Router();
const {
  getAllTaggings,
  getTagging,
  getTaggingsByResearcher,
  getAnimalsTaggings,
  addTagging,
} = require('../db/queries/taggingQueries.js');

router.get('/', getAllTaggings);
router.get('/:id', getTagging);
router.get('/researchers/:id', getTaggingsByResearcher);
router.get('/animals/:id', getAnimalsTaggings);
router.post('/', addTagging);

module.exports = router;
