let express = require('express');
let updateTeam = express.Router();
let Usr = require('../usrSchema.js');

updateTeam.post('/', async (req, res) => {
    

    try {
        let fetchUsrInfo = await Usr.find({_id:req.body.id});
        let updatedTeam;
        for (let i = 0; i < fetchUsrInfo[0].teams.length; i++){
            if(fetchUsrInfo[0].teams[i].teamID === req.body.teamID) {
                updatedTeam = {
                    teamName: req.body.teamName,
                    description: req.body.description,
                    website: req.body.website,
                    type: req.body.type,
                    tags: req.body.tags,
                    formation: req.body.formation,
                    team: fetchUsrInfo[0].teams[i].team,
                    teamID: fetchUsrInfo[0].teams[i].teamID
                }

                await Usr.updateOne({ _id: req.body.id, 'teams.teamID': fetchUsrInfo[0].teams[i].teamID}, { $set: { 'teams.$': updatedTeam } })
            }
        }

        fetchUsrInfo = await Usr.find({_id:req.body.id});
        return res.json(fetchUsrInfo);


        //  let savedTeam = await newTeam.save();
        //return res.json(savedTeam);

    } catch (err) {
        return res.json({ message: err });
    }
})

module.exports = updateTeam;