const express = require("express");
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const { MONGOURL,MDP,COOKIE_KEY } = require("./keys");
const data = require("./data")
const NCRouter = require("./routers/NC");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const NC = require("./models/NC");
const isAuthenticatedMiddleware = require("./middleware")
const session = require('express-session')
const MongoStore = require('connect-mongo');



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
app.use(cors({ credentials: true, origin: true }));


// Configure passport to use local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Check if user's credentials are valid
    if (username === "admin" && password === MDP) {
      console.log("carré bienvenue");
      
      return done(null, { username });
    } else {
      console.log("incorrect password");
      
      return done(null, false, { message: "Mot de passe incorrect" });
    }
  }
));

// Serialize user into session cookie
passport.serializeUser(function(user, done) {
 
  
  done(null, user.username);
});

// Deserialize user from session cookie
passport.deserializeUser((username, done) => {
  const adminUsername = "admin";

  if (username === adminUsername) {
    done(null, { username: adminUsername });
  } else {
    done(new Error("User not found."));
  }
});


// Set up authentication middleware
app.use(session({
  secret: COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    maxAge: 24*60*60*1000 // 1 day
  },  // using store session on MongoDB using express-session + connect
  store: new MongoStore({
    client: mongoose.connection.getClient(),
    collection: 'sessions'
  })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(NCRouter);

// Handle login request
// Routes
app.post("/login", passport.authenticate("local"), function(req, res) {
  res.sendStatus(200);
});

// Example protected route
app.get("/home", function(req, res) {
  res.send("Welcome to the home page!");
});


const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

mongoose.connection.on("connected", () => {
  console.log("Connected succesfully");
  https.createServer(options, app).listen(port, () => {
    console.log('Server running at ' + port);
  });
  
});



