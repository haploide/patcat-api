const Thesaurus = require('../models/thesaurus.model');
const KeywordCatalogue = require('../models/keywordCatalogue.model');
const Catalogue = require('../models/catalogue.model');


async function generateQueryList(query){
    try {
        let wordList = query.replace('.', '').replace(',', '').split(' ');
        let resultQueryList = [];

        for await (word of wordList){
            resultQueryList.push(word.toLowerCase());
        }

        return resultQueryList;
    } catch (error) {
        
    }
};


async function generateTermList(queryList){
    let termList = [];

    try {
        const thesaurusList = await Thesaurus.find().populate('keyword');
        if (thesaurusList) {
            for await (const thesaurus of thesaurusList) {
                if (queryList.includes(thesaurus.keyword.keyword)) {

                    termList.push({keyword: thesaurus.keyword.keyword, nr: thesaurus.numCatalogs, id: thesaurus.keyword._id});

                }
            }
        } 
        return termList;

    } catch (error) {

    }

};

async function generateKeyCatList(thesaurus){
    let KeyCatList = [];
    try {
        let  KeywordCatalogueList = await KeywordCatalogue.find({keyword: thesaurus.id});
        for await (const catalogue of KeywordCatalogueList){
            KeyCatList.push({ catalogue: catalogue.catalogue._id, tf: catalogue.frequency})
        }
    } catch (error) {
        
    }
    return KeyCatList;
};

async function countCatalogues(){
    try {
        return await Catalogue.find().countDocuments();
    } catch (error) {
        
    }
};

module.exports.SearchPattern = async (query, r) => {
    try {
        let k = 0;
        let resultList = [];
        const N = await countCatalogues();
 
        let queryList = await generateQueryList(query);

        let termList = await generateTermList(queryList);
        
        termList.sort((a,b)=>  a.nr - b.nr);
        
        for (const term of termList){
            let keyCatList =  await generateKeyCatList(term);
            for (const keyCat of keyCatList){
                    let catalogue = await Catalogue.findOne({_id: keyCat.catalogue});
                    let l = Math.log10( N / term.nr );
                    let weight = keyCat.tf*l;
                    let result = {
                        weight: weight,
                        catalogue: catalogue
                    }
                    if (k < r) {
                        resultList[k] = result;
                    } else {
                        if (k == r) {
                            resultList.sort((a, b) => b.weight - a.weight );
                        }
                        for(const res of resultList){
                            if (res.catalogue._id.toString() === result.catalogue._id.toString()) {
                                res.weight = res.weight + result.weight;
                                break;
                            }
                        }
                        if (resultList[0].weight - result.weight < 0) {

                            resultList[0] = result;
                        }
                    }
                k++;
            }
        }
        return resultList;

    } catch (error) {
        
    }
}