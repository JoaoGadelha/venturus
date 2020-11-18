 const mongoose = require('mongoose');
 

 const usrSchema = new mongoose.Schema({
   name: String,
   password: String,
   email: String,
   teams: []
}, { collection: 'venturus' });

module.exports = mongoose.model('venturus', usrSchema);