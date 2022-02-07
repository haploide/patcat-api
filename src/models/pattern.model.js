const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patternTypeSchema = new Schema({
    name : { type : String },
    patternType : this,
    intent : { type : String },
    motivation : { type : String },
    applicability : { type : String },
    participants : { type : String },
    consequences : { type : String },
    examples : { type : String },
    relatedPatterns : { types : String },
    sourceCredit : { type : String }
}, 
{
    collection : 'PatternType'
});

const patternSchema = new Schema({
    name : { type : String },
    description : { type : String },
    structure : { type : String },
    type : patternTypeSchema
}, {
    collection : 'Pattern'
});

module.exports = mongoose.model('Pattern', patternSchema);
