const express = require('express')
const app = express();
const db = require('./db')
require('dotenv').config(); // allows to use the env file

const passport = require('./auth')


const bodyParser = require('body-parser')
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000; // process.env.var_name is use to access the variable

// const Person = require('./models/person')  because we import this in personRoutes
// const Menuitem = require('./models/Menu') because we import this in menuRoutes

//Moddleware
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] : Request made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest) //apply to all 

//passport middleware

app.use(passport.initialize());



app.get('/', function(req, res) {
    res.send('this is a my server')
})



/// personRoutes  (express router) and menuRoutes
//import router file
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');
const Person = require('./models/person');

//use router
const middlewarePerson = passport.authenticate('local', { session: false });
app.use('/person', middlewarePerson, personRoutes)
app.use('/menu', menuRoutes)


app.listen(PORT, () => { console.log("server is runing on 3000") })