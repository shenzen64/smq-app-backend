const mongoose = require("mongoose");
const moment = require("moment")


const rsSchema = new mongoose.Schema({
  
  name: {
    type: String,
  },
  adresse: {
    type: String,
    trim: true,
    
  },
  phone: {
      type: String,
  },
  startDate:{
      type:[Number],  // correspond au i et j de la matrice calendrier
      required:true
  },
  duration:{
    type:Number, 
    required:true
  },
  week:{
      type:Date,
      required:true
  },
  verified:{
      type:Boolean,
      required:true
  },
  dateStr: {
    type: String,
    required:true
  }
},
  {
    timestamps: { currentTime: () => moment() },
  });



const Reservation = mongoose.model("Reservation", rsSchema);
module.exports = Reservation;
