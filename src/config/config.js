require('dotenv').config();

const CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.hostname = process.env.HOSTNAME || 'localhost';
CONFIG.port = process.env.PORT || '3000';
CONFIG.cantResult = process.env.CANT_RESULT || 1;

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';

module.exports = CONFIG;