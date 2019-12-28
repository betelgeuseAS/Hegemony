const express = require("express");
const record = express.Router();

// Load input validation
const validateRecord = require("../validation/record");

const Record = require("../models/Record");

// POST records/record
record.post('/record', (req, res) => {
  const { errors, isValid } = validateRecord(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Record.findOne({ name: req.body.name }).then(record => {
    if (record) {
      return res.status(400).json({name: "Name already exists"});
    } else {
      const record = new Record({
        type: req.body.type,
        name: req.body.name,
        content: req.body.content,
        tags: req.body.tags
      });
      record.save()
        .then(data => {
          res.send(data);
        }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Record."
        });
      });
    }
  });
});

//GET records/records
record.get('/records', (req, res) => {
  Record.find()
    .then(records => {
      res.send(records);
    })
    .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving records."
    });
  });
});

// GET records/record/:recordId
record.get('/record/:recordId', (req, res) => {
  Record.findById(req.params.recordId)
    .then(record => {
      if(!record) {
        return res.status(404).send({
          message: "Record not found with id " + req.params.recordId
        });
      }
      res.send(record);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Record not found with id " + req.params.recordId
      });
    }
    return res.status(500).send({
      message: "Error retrieving record with id " + req.params.recordId
    });
  });
});

// PUT records/record/:recordId
record.put('/record/:recordId', (req, res) => {
  const { errors, isValid } = validateRecord(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Record.findByIdAndUpdate(req.params.recordId, {
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address
  }, {new: true})
    .then(record => {
      if(!record) {
        return res.status(404).send({
          message: "Record not found with id " + req.params.recordId
        });
      }
      res.send(record);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Record not found with id " + req.params.recordId
      });
    }
    return res.status(500).send({
      message: "Error updating record with id " + req.params.recordId
    });
  });
});

// DELETE records/record/:recordId
record.delete('/record/:recordId', (req, res) => {
  Record.findByIdAndRemove(req.params.recordId)
    .then(record => {
      if(!record) {
        return res.status(404).send({
          message: "Record not found with id " + req.params.recordId
        });
      }
      res.send({message: "Record deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Record not found with id " + req.params.recordId
      });
    }
    return res.status(500).send({
      message: "Could not delete record with id " + req.params.recordId
    });
  });
});

// POST records/search
record.post('/search', (req, res) => {
  // Record.find({title: {$regex: new RegExp(req.body.search, "i")}}) or:
  // Record.find({ title: /^req.body.search.toLowerCase$/i }) or:
  Record.find({name: { $regex: req.body.search, $options: "i" }})
    .then(records => {
      res.send(records);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Nothing was found"
      });
    });
});

module.exports = record;
