const express = require("express");
const router = express.Router();
const NC = require("../models/NC");

router.get("/allNC", async (req, res) => {
  
  try {
    const allNC = await NC.find({}).sort({ date_ouverture: 'desc' })
    
    res.send(allNC);
  } catch (error) {
    res.send(404).json({
      error: "Unable to found allNC",
    });
  }

});


// Add NC
router.post("/createNC",async (req,res)=> {
  try {
    console.log(req.body.formData);
    const numero = (await NC.find({})).length +1
    console.log('numero: ',numero);
    
    const nc = new NC({
      ...req.body.formData,
      numero
    });
    await nc.save();
    res.send(nc);

  } catch (error) {
    console.log(error);
    
    res.status(422).json({
      error: "ERROR",
    });
  }
})

// Edit NC
router.put("/updateNC/:id", async (req, res) => {

  try {
    const nc = await NC.findByIdAndUpdate(req.params.id,{
      ...req.body.formData
    })
    res.send(nc);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
