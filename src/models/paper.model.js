const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paperSchema = new Schema({
    title : { type : String },
    date : { type : Date, default : Date.now },
    editor : { type : String },
    abstract : { type : String }
}, {
    collection : 'Paper'
});

module.exports = mongoose.model('Paper', paperSchema);