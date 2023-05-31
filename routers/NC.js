const express = require("express");
const router = express.Router();
const NC = require("../models/NC");
const requireAdmin = require("../middleware");
const ResultatNet = require("../models/ResultatNet")

router.get("/allNC", requireAdmin,async (req, res) => {
  
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
router.post("/createNC", requireAdmin,async (req,res)=> {
  try {
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
router.put("/updateNC/:id", requireAdmin,async (req, res) => {

  try {
    const nc = await NC.findByIdAndUpdate(req.params.id,{
      ...req.body.formData
    }, {
      new:true
    })
    
    res.send(nc);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Add ResultatNet API endpoint
router.post('/resultat-net', requireAdmin, async (req, res) => {
  try {
    const { month, amount } = req.body;
    // We have to check if we need to insert new one or update it
    const rn = await ResultatNet.findOne({month})
    if(rn) {
      rn.amount = amount
      await rn.save()
      res.status(201).json({ message: 'ResultatNet updated successfully' });
    } else {
      const newResultatNet = new ResultatNet({ month, amount });
      await newResultatNet.save();
      res.status(201).json({ message: 'ResultatNet added successfully' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
// Add ResultatNet API endpoint
router.get('/all-resultat-net', requireAdmin, async (req, res) => {
  try {;
    const allRN =await ResultatNet.find({})
    res.status(201).send(allRN);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


// Delete NC
router.delete("/delete/:id",requireAdmin,async (req,res)=>{
  try {
    const nc = await NC.findByIdAndDelete(req.params.id)
    console.log(req.params.id);
    res.send(nc)
    
  } catch (error) {
    console.log(error);
    
  }
})

module.exports = router;
