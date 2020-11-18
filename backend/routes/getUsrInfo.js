let express = require('express');
let getUsrInfo = express.Router();
let Usr = require('../usrSchema.js');

getUsrInfo.post('/', async (req, res) => {

    try {
        let fetchUsrInfo = await Usr.find({_id:req.body.id});
        return res.json(fetchUsrInfo);
        //  let savedTeam = await newTeam.save();
        //return res.json(savedTeam);

    } catch (err) {
        return res.json({ message: err });
    }
})

module.exports = getUsrInfo;