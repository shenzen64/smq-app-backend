const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({
  problem: {
    type: String, 
    required:true
  },
  solution: {
    type: String,
  },
  avancement: {
    type:Number,
    required:true
  }
  
});


// SolutionSchema.plugin(AutoIncrement, { inc_field: 'numero' });
const Solution = mongoose.model("Solution", SolutionSchema);
module.exports = Solution;
