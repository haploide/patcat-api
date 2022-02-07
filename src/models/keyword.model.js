'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keywordSchema = new Schema({
    _id : Schema.Types.ObjectId,
    keyword : { type : String }
},{
    collection : 'Keyword'
});


module.exports = mongoose.model('Keyword', keywordSchema);
