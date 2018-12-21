const { db } = require('./index.js');

const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings')
    .then(taggings => {
      res.status(200).json({
        status: 'success',
        data: taggings,
        message: 'Taggings retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getTagging = (req, res, next) => {
  let taggingId = parseInt(req.params.id);
  db.one('SELECT * FROM taggings WHERE id=$1', [taggingId])
    .then(tagging => {
      res.status(200).json({
        status: 'success',
        data: tagging,
        message: 'Tagging retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getTaggingsByResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any(
    'SELECT taggings.* FROM researchers JOIN taggings ON researchers.id = taggings.researcher_id WHERE researcher_id=$1',
    [researcherId]
  )
    .then(taggings => {
      res.status(200).json({
        status: 'success',
        data: taggings,
        message: 'Taggings by researcher retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getAnimalsTaggings = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.any(
    'SELECT taggings.* FROM animals JOIN taggings ON animals.id = taggings.animal_id WHERE animal_id=$1',
    [animalId]
  )
    .then(taggings => {
      res.status(200).json({
        status: 'success',
        data: taggings,
        message: 'Taggings on an animal retrieved!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const addTagging = (req, res, next) => {
  req.body.animal_id = parseInt(req.body.animal_id);
  req.body.researcher_id = parseInt(req.body.researcher_id);
  db.none(
    'INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Tagging added!',
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllTaggings,
  getTagging,
  getTaggingsByResearcher,
  getAnimalsTaggings,
  addTagging,
};
