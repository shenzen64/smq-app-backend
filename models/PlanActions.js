const mongoose = require("mongoose");

const PlanActionSchema = new mongoose.Schema({
  
  action: {
    type: String,
  }, 
  responsable :{
    type: String
  },
  avancement: {
    type:Number,
    required:false
  }, 
  notes : {
    type: String
  }
  
});

const PlanActions = mongoose.model("PlanActions", PlanActionSchema);
module.exports = PlanActions;
