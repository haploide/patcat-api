const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keywordCatalogueSchema = new Schema({
    keyword : { type : Schema.Types.ObjectId, ref : 'Keyword' },
    frequency : { type : Number },
    catalogue : { type : Schema.Types.ObjectId, ref : 'Catalogue'}
}, 
{
    collection : 'Keywordcatalogue'
});

module.exports = mongoose.model('KeywordCatalogue', keywordCatalogueSchema);