const { db } = require('./index.js');

const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
    .then(animals => {
      res.status(200).json({
        status: 'success',
        data: animals,
        message: 'Animals retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.one('SELECT * FROM animals WHERE id=$1', [animalId])
    .then(animal => {
      res.status(200).json({
        status: 'success',
        data: animal,
        message: 'Animal retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addAnimal = (req, res, next) => {
  req.body.species_id = parseInt(req.body.species_id);
  db.none(
    'INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Animal added!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editAnimal = (req, res, next) => {
  db.none(
    'UPDATE animals SET species_id=${species_id}, nickname=${nickname} WHERE id=${id}',
    {
      species_id: parseInt(req.body.species_id),
      nickname: req.body.nickname,
      id: parseInt(req.params.id),
    }
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Animal edited!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', animalId)
    .then(result => {
      res.status(200).json({
        status: 'success',
        result: result,
        message: 'Animal deleted!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllAnimals,
  getAnimal,
  addAnimal,
  editAnimal,
  deleteAnimal,
};
