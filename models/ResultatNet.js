const mongoose = require("mongoose");
// Define Turnover schema
const ResultatNetSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique:true
  },
  amount: {
    type: Number,
    required: true,
  },
});

const ResultatNet = mongoose.model('ResultatNet', ResultatNetSchema);
module.exports = ResultatNet