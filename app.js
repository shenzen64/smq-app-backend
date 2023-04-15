const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const { MONGOURL,MDP,JWT_SECRET } = require("./keys");
const data = require("./data")
const NCRouter = require("./routers/NC");
const NC = require("./models/NC");
const jwt = require("jsonwebtoken")



const load_process_data= async ()=> {
    // Iterate over the data and insert it into the db
    data.forEach(async line => {
      // console.log(line[0]);
      
      const nc =  new NC({
        numero:line[0],
        date_ouverture: line[1] && new Date((line[1] - 25569) * 86400 * 1000),
        // Mois c'est le line[2] on en a pas besoin
        type_nc:line[3],
        client:line[4],
        numero_dossier:line[5]+"", // To convert it to a string as the model is defined
        quantité:line[6],
        description:line[7],
        analyse:line[8],
        secteur:line[9],
        type_defaut:line[10],
        // Délai pas besoin
        pilote:line[12],
        actions:line[13],
        realise_le:line[14],
        cout:line[15]
      })
      await nc.save()
    });
}

// load_process_data()

mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




app.use(express.json());
// Allow CORS for all routes
app.use(cors());
app.use(NCRouter);


const generateAuthToken = async function () {

  const token = await jwt.sign({ username: "admin" }, JWT_SECRET);

  
  return token;
};

// Handle login request
// Routes
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Please provide an username and password" });
    }
    if(username!="admin" || password != MDP){
      return res
      .status(422)
      .json({ error: "Incorrect Password" });
    }
    
    const token = await generateAuthToken();

    res.status(200).send({ token });
  } catch (e) {
    console.log(e);
    
    res.status(400).json({
      error: "Failed to authenticate",
    });
  }
});

// Example protected route
app.get("/home", function(req, res) {
  console.log("Testing purpose");
  
  res.send("Welcome to the home page!");
});


// const options = {
//   // key: fs.readFileSync('key.pem'),
//   // cert: fs.readFileSync('cert.pem')
// };

mongoose.connection.on("connected", () => {
  console.log("Connected succesfully");
  app.listen(port, () => {
    console.log('Server is working i think in ' + port);
  });
  
});



