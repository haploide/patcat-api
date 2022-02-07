const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors')

const CONFIG = require('./config/config');
const { theme } = require('./services/utils.services');
const database = require('./config/database');
const router = require('./routes/v1')

const app = express();
database();

app.use(bodyParse.urlencoded({ extended : true }));
app.use(bodyParse.json());
app.use(cors());
app.use('', router);


app.listen(CONFIG.port, CONFIG.hostname, () => {
    console.log(theme.success(`Server running at http://${CONFIG.hostname}:${CONFIG.port}`));
});
