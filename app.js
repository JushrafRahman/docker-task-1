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
    res.redirect('/homepage');
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

app.get('/edit/:id',async(req, res) => { //Edit user info
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

app.put('/edit/:id', async(req, res) => { //Update edited info into the db
    const uid = req.params.id;
    const {firstName,lastName,email,phone} = req.body;
    try{
      const updatedVal = await User.findByIdAndUpdate(uid,{
          firstName : firstName,
          lastName : lastName,
          email : email,
          phone : phone
      });
      console.log("Update successfull in db");
      res.redirect('/homepage');
    }
    catch(err)
    {

        console.log("Update failed in db");
    }
});

app.delete('/delete/:id', async(req,res) => { //Delete user 
    const uid = req.params.id;
    try{
       await User.findByIdAndRemove(uid);
       console.log("Successfully deleted!");
       res.redirect('/homepage');

    }
    catch(err)
    {
        console.log("error while deleting");
    }

});

app.get('/new', (req, res) => { //Request form for new user input
    console.log("get request for new insertion of user");
    res.render('create');
});

app.post('/new', async(req,res) => {
    console.log(req.body);
    try{
    const userLatest = new User(req.body);
    await userLatest.save();
    console.log("Successfully inserted new user!");
    res.redirect('/homepage');
    }
    catch(err)
    {
        console.log("Error while inserting new user to the database");
    }
})

app.listen(3000, () => {
    console.log("At port 3000!");
});