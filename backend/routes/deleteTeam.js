let express = require('express');
let deleteTeam = express.Router();
let Usr = require('../usrSchema.js');

deleteTeam.post('/', async (req, res) => {
    

    try {
        await Usr.update({_id: req.body.id},{$pull:{'teams':{'teamID':req.body.teamID}}});

        fetchUsrInfo = await Usr.find({_id:req.body.id});
        return res.json(fetchUsrInfo);


        //  let savedTeam = await newTeam.save();
        //return res.json(savedTeam);

    } catch (err) {
        return res.json({ message: err });
    }
})

module.exports = deleteTeam;