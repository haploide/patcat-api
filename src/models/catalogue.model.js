const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogueSchema = new Schema({
    title : { type : String },
    description : { type : String },
    date : { type : Date, default : Date.now },
    bussinessProcess : { type : Schema.Types.ObjectId, ref : 'BusinessProcess' },
    pattern : [ { type : Schema.Types.ObjectId, ref : 'Pattern' } ],
    paper : [ { type : Schema.Types.ObjectId, ref : 'Paper' } ]
}, {
    collection : 'Catalogue'
});

module.exports = mongoose.model('Catalogue', catalogueSchema);