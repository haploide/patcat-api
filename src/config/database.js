const mongoose = require('mongoose');

const { theme } = require('../services/utils.services');
const CONFIG = require('./config');
let uri = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/patcat?readPreference=primary&appname=PatCat&ssl=false`;

const options = {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true

};

module.exports = () => {

    mongoose.connect(uri, options).then(
        ()=>{
                console.log(theme.success("Mongoose default connection is open to", uri));
            },
        (err) => {
                console.log(theme.danger("Error connecting Database instance due to", err));
        }
    );

    mongoose.connection.on('disconnected', function(){
        console.log(theme.danger('Mongoose default connection is disconnected'))
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(theme.info("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}
