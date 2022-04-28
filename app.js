const express = require('express');
const app = express();
const connectDB = require('./backend/connection');
const path = require('path');
const mongoose = require('mongoose');

const User = require('./models/user');

connectDB(); //connect to the db

const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res) => {
    res.send("Go to /homepage endpoint");
});

app.get('/homepage',async(req,res) => { //view all user data
    try{
        const userData  = await User.find(); //fetch all user data
        res.render('homepage',{userData});

    }catch(err)
    {
        console.log(`Error inside get/homepage while fetching data : ${err}`);
    }
});

app.get('/edit/:id',async(req, res) => {
    const uid = req.params.id;
    try{
    const userDetails = await User.findById(uid);
    console.log(userDetails);
    res.render('edit',{userDetails});

    }
    catch(err)
    {
        console.log("Error while editing!");
    }
});

app.get('/delete/:id', (req,res) => {
    res.render('delete');
});

app.get('/new', (req, res) => {
    res.render('create');
});

app.listen(3000, () => {
    console.log("At port 3000!");
});