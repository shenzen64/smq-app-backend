const mongoose = require("mongoose");

const NCSchema = new mongoose.Schema({
  numero: {
    type: String, // Parfois y'a 28 a
    // default: 22,
    // unique:true
  },
  date_ouverture: {
    type: Date,
  },
  type_nc: {
    type:String,
    required:true
  },
  client: {
    type: String
  },
  numero_dossier: {
    type:String
  },
  quantité: {
    type: String // Parfois ça peut être genre 2 Bobines
  },
  description:{
    type: String
  }, 
  analyse:{
    type: String
  }, 
  secteur:{
    type: String
  }, 
  type_defaut:{
    type: String
  }, 
  date_realisation:{
    type: Date
  }, 
  actions:{
    type: String
  }, 
  risques_et_opportunites:{
    type: String
  }, 
  pilote:{
    type: String
  }, 
  cout:{
    type: Number
  }, 
  
});


// NCSchema.plugin(AutoIncrement, { inc_field: 'numero' });
const NC = mongoose.model("NC", NCSchema);
module.exports = NC;
