'use strict';

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: { type: String, index: true },
    price: Number,
    type: String,
    img: String,
    tags: [String]
})