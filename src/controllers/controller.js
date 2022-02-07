'use strict';
const mongoose = require('mongoose');

const BusinessProcess = require('../models/businessProcess.model');
const Thesaurus = require('../models/thesaurus.model');
const Keyword = require('../models/keyword.model');
const KeywordCatalogue = require('../models/keywordCatalogue.model');
const Catalogue = require('../models/catalogue.model');
const { SearchPattern } = require('../services/motor.services');
const CONFIG = require('../config/config');

/* BusinessProcess CRUD */

module.exports.GetAllBusinessProcess = async (req, res) => {
    try {
        const list = await BusinessProcess.find({}).exec();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.CreateNewBusinessProcess = async (req, res) => {
    try {
        let newBusiness = await new BusinessProcess(req.body).save();
        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.DeleteNewBusinessProcess = async (req, res) => {
    try {
        if (req.query.id) {
            const deleteBusiness = await BusinessProcess.deleteOne({_id : req.query.id});
            res.status(200).json(deleteBusiness); 
            // TODO: diferenciar cuando se borra de cuando no
        }else
        {
            res.status(400).send("BAD REQUEST");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}


/* Thesaurus CRUD */

module.exports.GetAllThesaurus = async (req, res) => {
    try {
        const thesaurusList = await Thesaurus.find().populate('keyword');
        res.status(200).json(thesaurusList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.DeleteNewThesaurus = async (req, res) => {
    try {
        if (req.query.id) {
            const deleteThesaurus = await Thesaurus.deleteOne({_id : req.query.id});
            res.status(200).json(deleteThesaurus); 
            // TODO: diferenciar cuando se borra de cuando no
        }else
        {
            res.status(400).send("BAD REQUEST");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.CreateNewThesaurus = async (req, res) => {

    try {
        if (req.body.keyword) {
            const newKeyword = await new Keyword({ 
                                                _id : new mongoose.Types.ObjectId(),
                                                keyword : req.body.keyword
                                            }).save();

            const newThesaurus = await new Thesaurus({
                                                    keyword : newKeyword._id, 
                                                    maxFrequency : req.body.maxFrequency, 
                                                    numCatalogs : req.body.numCatalogs
                                                }).save();

            await Thesaurus.populate(newThesaurus, 'keyword');

            res.status(201).json(newThesaurus);
            
        } else {
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

/* KeywordCatalogue CRUD */
module.exports.GetAllKeywordCatalogue = async (req, res) => {
    try {
        const keywordCatalogueList = await KeywordCatalogue.find()
                                                .populate('keyword')
                                                .populate('catalogue');
        res.status(200).json(keywordCatalogueList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.DeleteKeywordCatalogue = async (req, res) => {
    try {
        if (req.query.id) {
            const deleteKeywordCatalogue = await KeywordCatalogue.deleteOne({_id : req.query.id});
            res.status(200).json(deleteKeywordCatalogue); 
            // TODO: diferenciar cuando se borra de cuando no
        }else
        {
            res.status(400).send("BAD REQUEST");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports.CreateNewKeywordCatalogue = async (req, res) => {
    try {
        if (req.body.Keyword) {
            let keyword = await Keyword.findOne({keyword: req.body.Keyword});

            let catalogue = await Catalogue.findOne({title: req.body.catalogue});

            if (keyword && catalogue) {
                let newKeywordCatalogue = await new KeywordCatalogue ({
                                                                        keyword: keyword._id,
                                                                        frequency: req.body.frequency,
                                                                        catalogue: catalogue._id
                                                                        }).save();

                res.status(201).json(newKeywordCatalogue);  
            } else {
                res.status(400).send('Bad Request');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

/* Catalogue CRUD */
module.exports.GetAllCatalogue = async (req, res) => {
    try {
        const catalogueList = await Catalogue.find();
        res.status(200).json(catalogueList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.DeleteCatalogue = async (req, res) => {
    try {
        if (req.query.id) {
            const deleteCatalogue = await Catalogue.deleteOne({_id : req.query.id});
            res.status(200).json(deleteCatalogue); 
            // TODO: diferenciar cuando se borra de cuando no
        }else
        {
            res.status(400).send("BAD REQUEST");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.CreateNewCatalogue = async (req, res) => {
    try {
        if (req.body.title) { // TODO: Completar los demas campos
            let newCatalogue = await new Catalogue({
                                                    title: req.body.title,
                                                    description: req.body.description
                                                }).save();

            res.status(201).json(newCatalogue);
        } else {
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


/* Motor services */

module.exports.SearchPattern = async (req, res) => {
    try {
        if (req.body.query) {
            let result = await SearchPattern(req.body.query, CONFIG.cantResult);
     
            res.status(200).json(result);
     
         } else {
             res.status(400).send('Bad Request');
         }
        
    } catch (error) {
        res.status(500).send(error);
    }
}
