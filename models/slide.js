const { model } = require('../../../My Courses/Code with Node/surf-shop/models/post');

const mongoose = require('mongoose'),
Schema         = mongoose.Schema;


const SlideSchema = new Schema({
    images: [ { url: String, filename: String } ],
});

module.exports = mongoose.model('Slide', SlideSchema);