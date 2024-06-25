const express = require('express')
const app = express();
const db = require('./db')
require('dotenv').config(); // allows to use the env file

const bodyParser = require('body-parser')
app.use(bodyParser.json()); //req.body

// const Person = require('./models/person')  because we import this in personRoutes
// const Menuitem = require('./models/Menu') because we import this in menuRoutes

app.get('/', function(req, res) {
    res.send('this is a my server')
})



/// personRoutes  (express router) and menuRoutes
//import router file
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

//use router
app.use('/person', personRoutes)
app.use('/menu', menuRoutes)

const PORT = process.env.PORT || 3000; // process.env.var_name is use to access the variable

app.listen(PORT, () => { console.log("server is runing on 3000") })