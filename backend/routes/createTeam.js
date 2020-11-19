let express = require('express');
let createTeam = express.Router();
let Usr = require('../usrSchema.js');
let newTeamArray = require('../functions/newTeamArray')

createTeam.post('/', async (req, res) => {
    let teamArray = await newTeamArray.newTeamArray();
    let teamID = Math.random().toString(36).substr(2, 20) + Math.random().toString(36).substr(2, 20);
    let newTeam = {
        teamID: teamID,
        team: teamArray,
        teamName: req.body.teamName,
        description: req.body.description,
        website: req.body.website,
        type: req.body.type,
        tags: req.body.tags,
        formation: req.body.formation

    }

    try {
        let fetchUsrInfo = await Usr.find({_id:req.body.id});
        fetchUsrInfo[0].teams.push(newTeam);
        let updateTeam = await Usr.updateOne({_id:req.body.id},{$set:{teams:fetchUsrInfo[0].teams}});
        
        fetchUsrInfo = await Usr.find({_id:req.body.id});
        return res.json(fetchUsrInfo);
        //  let savedTeam = await newTeam.save();
        //return res.json(savedTeam);

    } catch (err) {
        return res.json({ message: err });
    }
})

module.exports = createTeam;
