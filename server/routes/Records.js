const express = require("express");
const record = express.Router();
const _ = require('lodash');
const moment = require('moment');

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
    content: req.body.content,
    tags: req.body.tags,
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

// POST records/search/date
record.post('/search/date', (req, res) => {
  Record.find({createdAt: { $gte: new Date(req.body.search) }})
    .then(records => {
      res.send(records);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Nothing was found"
      });
    });
});

// GET records/tree
record.get('/tree', (req, res) => {
  let dateRecords = [], tree = [];

  Record.find()
    .sort({created: -1})
    .then(records => {
      _.forEach(records, record => {
        dateRecords.push({
          year: moment(record.created).year(),
          month: moment(record.created).month(),
          day: moment(record.created).day(),
          _id: record._id,
          name: record.name
        });
      });
      _.forEach(dateRecords, date => {
        if (!_.find(tree, {year: date.year})) {
          tree.push({
            year: date.year,
            months: [{
              month: date.month,
              days: [{
                day: date.day,
                records: [{_id: date._id, name: date.name}]
              }]
            }]
          });
        } else {
          let indexYear = _.findIndex(tree, {year: date.year});
          if (!_.find(tree[indexYear].months, {month: date.month})) {
            tree[indexYear].months.push({
              month: date.month,
              days: [{
                day: date.day,
                records: [{_id: date._id, name: date.name}]
              }]
            })
          } else {
            let indexMonth = _.findIndex(tree[indexYear].months, {month: date.month});
            if (!_.find(tree[indexYear].months[indexMonth].days, {day: date.day})) {
              tree[indexYear].months[indexMonth].days.push({
                day: date.day,
                records: [{_id: date._id, name: date.name}]
              });
            } else {
              let indexDay = _.findIndex(tree[indexYear].months[indexMonth].days, {day: date.day});
              tree[indexYear].months[indexMonth].days[indexDay].records.push({_id: date._id, name: date.name});
            }
          }
        }
      });
      res.send(tree);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "No data"
      });
    });
});

module.exports = record;
