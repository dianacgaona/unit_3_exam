const { db } = require('./index.js');

const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
    .then(habitats => {
      res.status(200).json({
        status: 'success',
        data: habitats,
        message: 'Habitats retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.one('SELECT * FROM habitats WHERE id=$1', [habitatId])
    .then(habitat => {
      res.status(200).json({
        status: 'success',
        data: habitat,
        message: 'Habitat retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(category) VALUES(${category})', req.body)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Habitat added!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllHabitats, getHabitat, addHabitat };
