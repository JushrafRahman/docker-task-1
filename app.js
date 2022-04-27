const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const dataset = [
    {
        firstName : "Jushraf",
        lastName : "Chowdhury",
        email : "jushrafrahi97@gmail.com",
        phone : "12345"
    },
    {
        firstName : "Mason",
        lastName : "Mount",
        email : "moneymase@gmail.com",
        phone : "987"
    },
    {
        firstName : "Declan",
        lastName : "Rice",
        email : "deccers@gmail.com",
        phone : "41"
    },
    {
        firstName : "John",
        lastName : "Terry",
        email : "cap@gmail.com",
        phone : "26"
    }
];
app.get('/homepage',(req,res) => {
    console.log("At homepage!");
    res.render('homepage',{dataset});
});

app.get('/edit',(req, res) => {
    res.send('Edit user info');
});

app.get('/delete', (req,res) => {
    res.send('Delete user info');
});

app.get('/new', (req, res) => {
    res.send('Add new user');
});

app.listen(3000, () => {
    console.log("At port 3000!");
});