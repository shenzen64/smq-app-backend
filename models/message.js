const mongoose = require("mongoose");
const moment = require("moment")


const msgSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required:true
  },
  mail: {
    type: String,
    trim: true,
    required:true
  },
  phone: {
      type: String,
      required:true
  },
  message:{
      type:String,
      required:true
  },
  
},
  {
    timestamps: { currentTime: () => moment() },
  });



const Message = mongoose.model("Message", msgSchema);
module.exports = Message;
