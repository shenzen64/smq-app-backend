const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const { MONGOURL } = require("./keys");
const data = require("./data")
const NCRouter = require("./routers/NC");
const NC = require("./models/NC");

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
app.use(cors());
app.use(NCRouter);


mongoose.connection.on("connected", () => {
  console.log("Connected succesfully");
  app.listen(port, () => {
    console.log("SERVER IS UP IN PORT " + port);
  });
  
});






