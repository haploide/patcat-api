const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name : { type : String },
    description : { type : String }
}, {
    collection : 'BusinessProcessCategory'
});

const businessProcessSchema = new Schema({
    name : { type : String },
    description : { type : String },
    category : categorySchema    
}, {
    collection : 'BusinessProcess'
});

module.exports = mongoose.model('BusinessProcess', businessProcessSchema);