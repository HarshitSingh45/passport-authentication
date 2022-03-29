const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/passportLocalAuthDevelopment');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in running the server'));
db.once('open', () => {
    console.log('Connected to the database: mongodb');
})

module.exports= db;