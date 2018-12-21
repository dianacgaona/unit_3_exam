const { db } = require('./index.js');

const getAllResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
    .then(researchers => {
      res.status(200).json({
        status: 'success',
        data: researchers,
        message: 'Researchers retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.one('SELECT * FROM researchers WHERE id=$1', [researcherId])
    .then(researcher => {
      res.status(200).json({
        status: 'success',
        data: researcher,
        message: 'Researcher retrieved!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addResearcher = (req, res, next) => {
  db.none(
    'INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Researcher added!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editResearcher = (req, res, next) => {
  db.none(
    'UPDATE researchers SET name=${name}, job_title=${job_title} WHERE id=${id}',
    {
      name: req.body.name,
      job_title: req.body.job_title,
      id: parseInt(req.params.id),
    }
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Researcher edited!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', researcherId)
    .then(result => {
      res.status(200).json({
        status: 'success',
        result: result,
        message: 'Researcher deleted!',
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllResearchers,
  getResearcher,
  addResearcher,
  editResearcher,
  deleteResearcher,
};
