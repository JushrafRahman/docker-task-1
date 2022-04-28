const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/userInfo');
        console.log("Connection successful!");

    }catch(err)
    {
        console.log(`Error : ${err}`);
    }
}

module.exports = connectDB;