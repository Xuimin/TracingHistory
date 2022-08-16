const db = require("../models")
const History = db.history;

exports.create = (req, res) => {
  if(!req.body.location || 
    !req.body.date || 
    !req.body.time) {
    res.status(400).send({ message: "Content cannot be empty" })
    return;
  }

  const history = new History({
    location: req.body.location,
    date: req.body.date,
    time: req.body.time
  })

  // Save history into mongodb
  history.save(history)
  .then(data => {res.send(data)})
  .catch(err => {
    res.status(500).send({ message: err.message || 
      "Some error occured when inserting data" })
  })
}

exports.getAll = (req, res) => {
  History.find({})
  .then(data => {res.send(data)})
  .catch(err => {
    res.status(500).send({ message: err.message || 
      "Error retrieving data with id" })
  })
}

exports.getById = (req, res) => {
  const id = req.params.id
  // .findOne({ id: req.parmas.id })
  History.findById(id)
  .then(data => {
    if(!data) { 
      return res.status(404).send({ message: "Not found with id " + id })
    } else {
      return res.send(data)
    } 
  })
  .catch(err => {
    res.status(500).send({ message: err.message 
      || "Error retrieving data with id " + id })
  })
}

exports.update = (req, res) => {
  console.log(req.body)
  if(!req.body.location || 
    !req.body.date || 
    !req.body.time) { 
    return res.status(400).send({ message: "Data to be updated is empty" })
  }

  const id = req.params.id
  // .findOneAndUpdate({ id: req.params.id })
  History.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if(!data) {
      res.status(404).send({ message: `Data with ${id} cannot be updated` })
    } else {
      res.send({ message: "Data updated successfully", data })
    }
  })
  .catch(err => {
    res.status(500).send({ message: "Error updating data with id " + id })
  })
}

exports.deleteById = (req, res) => {
  const id = req.params.id
  // .findOneAndRemove({ id: req.params.id })
  // .findByIdAndDelete({ id: req.params.id })
  History.findByIdAndRemove(id)
  .then(data => {
    if(!data) {
      res.status(404).send({ message: `Data with ${id} cannot be deleted` })
    } else {
      res.send({ message: "Data deleted successfully" })
    }
  }).catch(err => {
    res.status(500).send({ message: "Error deleting data with id " + id })
  })
}

exports.deleteAll = (req, res) => {
  History.deleteMany({}).then(data => {
    res.send({ message: `${data.deletedCount}` })
  }).catch(err => {
    res.status(500).send({
      message: err.message || 
      "Some error occured whe deleting all histories"
    })
  }) 
}

exports.search = (req, res) => {
  const keyword = req.params.keyword
  // i - case insensitive
  // g - case sensitive
  History.find({ location: { $regex: keyword, $options: "i" } })
  .then(data => {res.send(data)})
  .catch(err => {
    res.status(500).send({
      message: err.message || 
      "Error retrieving data"
    })
  })
}