'use strict';

const mongoose = require('mongoose');

// Define schema
const adSchema = mongoose.Schema({
  title: { type: String, createIndexes: true },
  description: String,
  price: { type: Number, createIndexes: true },
  type: { type: String, createIndexes: true },
  img: String,
  tags: { type: [String], createIndexes: true }
});

// Mongoose model static method
adSchema.statics.filterAndList = function(filter, limit, skip, sort) {
  const query = Ad.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  return query.exec();
};

// Create model object, specify collection and schema
const Ad = mongoose.model('ad', adSchema);

// Export model
module.exports = Ad;