//require the library
const mongoose = require('mongoose');

//connect to the dataBase
mongoose.connect('mongodb://localhost/contacts_list_db');

//aquire the connection (to check if it is succesful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the msg
db.once('open', function () {
    console.log('Succesfully connected to database');
});