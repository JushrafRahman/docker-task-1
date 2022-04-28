const mongoose  = require('mongoose');
const connectDB = require('./connection');
const User = require('../models/user');
const initDataset = require('./dataset');

connectDB(); //connect to the db


User.insertMany(initDataset)
.then( (data) => {
    console.log("Successfully populated the database!");
    console.log(data);
})
.catch( (err) => {
    console.log("Failed to populate the database!");
    console.log(err);
})




