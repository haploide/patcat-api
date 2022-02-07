const chalk = require('chalk');

const success = chalk.bold.green;
const danger = chalk.bold.red;
const warning = chalk.bold.yellow;
const info = chalk.bold.cyan;

module.exports.theme = {
    success,
    danger,
    warning,
    info
};