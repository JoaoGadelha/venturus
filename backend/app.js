const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
let getUsrInfo = require('./routes/getUsrInfo');
let deleteTeam = require('./routes/deleteTeam');
let updateTeam = require('./routes/updateTeam');
let createTeam = require('./routes/createTeam');
//let getUsr = require('./routes/getUsr');
let createUsr = require('./routes/createUsr');
const shutDown = require('./shutdown');

//middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

//routes
app.use('/getUsrInfo', getUsrInfo);
app.use('/createTeam', createTeam);
app.use('/createUsr', createUsr);
app.use('/updateTeam', updateTeam);
app.use('/deleteTeam', deleteTeam);

//database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log('Connected to DB.') });

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);


app.listen((process.env.PORT || 5000),
    () => console.log("Server is running in port " + (process.env.PORT || 5000)));
