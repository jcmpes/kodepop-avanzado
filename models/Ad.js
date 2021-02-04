'use strict';

const mongoose = require('mongoose');

// Define schema
const adSchema = mongoose.Schema({
    title: { type: String },
    description: String,
    price: Number,
    type: String,
    img: String,
    tags: [String]
});

// Mongoose model static method
adSchema.statics.filterAndList = function(filter, limit, skip) {
    const query = Ad.find(filter);
    query.limit(limit);
    query.skip(skip);
    return query.exec();
};

// Create model object, specify collection and schema
const Ad = mongoose.model('ad', adSchema);

// Export model
module.exports = Ad;