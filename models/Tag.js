'use strict';

const mongoose = require('mongoose');

// Define schema
const tagSchema = mongoose.Schema({
  tag: { type: String },
});

// Create model object, specify collection and schema
const Tag = mongoose.model('tag', tagSchema);

// Export model
module.exports = Tag;