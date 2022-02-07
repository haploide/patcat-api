const { Router } = require('express');
const express = require('express')
const router = express.Router();

const { 
        GetAllBusinessProcess, 
        CreateNewBusinessProcess, 
        DeleteNewBusinessProcess,
        CreateNewThesaurus,
        GetAllThesaurus,
        DeleteNewThesaurus,
        CreateNewKeywordCatalogue,
        GetAllKeywordCatalogue,
        DeleteKeywordCatalogue,
        GetAllCatalogue,
        DeleteCatalogue,
        CreateNewCatalogue,
        SearchPattern
    } = require("../controllers/controller");

router.get('/ping', (req, res) => {
    res.send('pong!')
});

router.post('/SearchDocument', SearchPattern);


router.route('/BusinessProcess')
        .get(GetAllBusinessProcess)
        .post(CreateNewBusinessProcess)
        .delete(DeleteNewBusinessProcess);

router.route('/Keyword')
        .get(GetAllThesaurus)
        .post(CreateNewThesaurus)
        .delete(DeleteNewThesaurus);

router.route('/KeywordCatalogue')
        .get(GetAllKeywordCatalogue)
        .post(CreateNewKeywordCatalogue)
        .delete(DeleteKeywordCatalogue);

router.route('/Catalogue')
        .get(GetAllCatalogue)
        .post(CreateNewCatalogue)
        .delete(DeleteCatalogue);


module.exports = router;