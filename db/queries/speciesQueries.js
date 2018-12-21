const { db } = require('./index.js');

const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species')
    .then(species => {
      res.status(200).json({
        status: 'success',
        data: species,
        message: 'Species retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.one('SELECT * FROM species WHERE id=$1', [speciesId])
    .then(species => {
      res.status(200).json({
        status: 'success',
        data: species,
        message: 'Species retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addSpecies = (req, res, next) => {
  db.none(
    'INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Species added!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllSpecies, getSpecies, addSpecies };
