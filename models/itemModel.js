const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sub_description: {
        type: String,
        requied: false
    },
    description: {
        type: String,
        required: true
    },
  
    image:{
        type: Array,
        required: true
    },

    category:{
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

module.exports = Item = mongoose.model('item',ItemSchema);