const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs');


app.listen(3000, () => {
    console.log("At port 3000!");
})