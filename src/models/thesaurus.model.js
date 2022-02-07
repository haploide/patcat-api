'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thesaurusSchema = new Schema({
    keyword : { type : Schema.Types.ObjectId, ref : 'Keyword' },
    maxFrequency : { type : Number },
    numCatalogs : { type : Number }
},
{
    collection : 'Thesaurus'
});

module.exports = mongoose.model('Thesaurus', thesaurusSchema);