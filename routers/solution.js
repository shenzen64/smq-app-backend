const express = require("express");
const router = express.Router();
const Solution = require("../models/Solution");
const requireAdmin = require("../middleware");

router.get("/allSolutions", requireAdmin,async (req, res) => {
  
  try {
    const allSolution = await Solution.find({})
    
    res.send(allSolution);
  } catch (error) {
    res.send(404).json({
      error: "Unable to found all Solutions",
    });
  }

});


// Add Solution
router.post("/createSolution",async (req,res)=> {
  try {

     
    const sol = new Solution({
      ...req.body,
      avancement:0
      
    });
    await sol.save();
    res.send(sol);

  } catch (error) {
    console.log(error);
    
    res.status(422).json({
      error: "ERROR",
    });
  }
})

// Edit solution
router.put("/updateSolution/:id", requireAdmin,async (req, res) => {

  try {
    const nc = await Solution.findByIdAndUpdate(req.params.id,{
      ...req.body.formData
    }, {
      new:true
    })
    
    res.send(nc);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
