let express = require('express');
let createUsr = express.Router();
let Usr = require('../usrSchema.js');
let newTeamArray = require('../functions/newTeamArray')

createUsr.post('/', async (req, res) => {

    try {
        let newUsr = new Usr({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            teams: []
        })

        let saveUsr = await newUsr.save();
        return res.json(saveUsr);
        //  let savedTeam = await newTeam.save();
        //return res.json(savedTeam);

    } catch (err) {
        res.json({ message: err });
    }

    try {
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = createUsr;