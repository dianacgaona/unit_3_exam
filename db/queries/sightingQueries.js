const { db } = require('./index.js');

const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
    .then(sightings => {
      res.status(200).json({
        status: 'success',
        data: sightings,
        message: 'Sightings retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSpeciesSightings = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.any(
    'SELECT sightings.* FROM species JOIN sightings ON species.id = sightings.species_id WHERE species_id=$1',
    [speciesId]
  )
    .then(species => {
      res.status(200).json({
        status: 'success',
        data: species,
        message: 'Sightings of a species retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getSightingsForResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any(
    'SELECT sightings.* FROM researchers JOIN sightings ON researchers.id = sightings.researcher_id WHERE researcher_id=$1',
    [researcherId]
  )
    .then(researcher => {
      res.status(200).json({
        status: 'success',
        data: researcher,
        message: 'Sightings for a researcher retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getSightingsForHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.any(
    'SELECT sightings.* FROM habitats JOIN sightings ON habitats.id = sightings.habitat_id WHERE habitat_id=$1',
    [habitatId]
  )
    .then(habitat => {
      res.status(200).json({
        status: 'success',
        data: habitat,
        message: 'Sightings for a habitat retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const addSighting = (req, res, next) => {
  req.body.researcher_id = parseInt(req.body.researcher_id);
  req.body.species_id = parseInt(req.body.species_id);
  req.body.habitat_id = parseInt(req.body.habitat_id);
  db.none(
    'INSERT INTO sightings(researcher_id, species_id, habitat_id ) VALUES(${researcher_id}, ${species_id}, ${habitat_id} )',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Sighting added!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSighting = (req, res, next) => {
  let sightingId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', sightingId)
    .then(result => {
      res.status(200).json({
        status: 'success',
        result: result,
        message: 'Sighting deleted!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllSightings,
  getSpeciesSightings,
  getSightingsForResearcher,
  getSightingsForHabitat,
  addSighting,
  deleteSighting,
};
