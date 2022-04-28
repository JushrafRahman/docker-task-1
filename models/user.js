const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    phone : String
});

const User = new mongoose.model('User',userSchema); 

//'User' model is created which is like a class to mongoose
//we will create instances of this class , which are documents(rows) and will be inserted into the db
//'users' collection will be created in the database

module.exports = User;