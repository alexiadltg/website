const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

require("dotenv").config();
const app = express();

//app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session1",
    secret: process.env.COOKIE_SECRET || "cookieSecret",
    httpOnly: true,
  })
);

const db = require("./models");
const Role = db.role;
const gameConfig = db.gameConfig
const gameConfigV2 = db.gameConfigV2



db.mongoose
  .connect(
   `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "DAMA_Grup7",
      authSource: "DAMA_Grup7"
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome Test Test Test dsldnmadasdnsad." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server API is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

    }
  });

  gameConfig.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new gameConfig({
        name: "gameConfigDefault",
        witch: {
          hp: 70,
          speed: 70
        },
        rogue: {
          hp: 100,
          speed: 100
        },
        purpleFlame: {
          hp: 20,
          speed: 60,
          points: 1
        },
        purpleFlameBoss: {
          hp: 500,
          speed: 50,
          points: 50
        }  
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'gameConfigDefault' to gameConfig collection");
      });

    }
  })

  gameConfigV2.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new gameConfigV2({
          name:"witch",
          hp: 70,
          velocity: 70    
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'witch' to gameConfigV2 collection");
      });

      new gameConfigV2({
        name:"rogue",
        hp: 100,
        velocity: 100    
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'rogue' to gameConfigV2 collection");
    });

    new gameConfigV2({
      name:"purpleFlame",
      hp: 20,
      velocity: 30,
      points: 1   
  }).save((err) => {
    if (err) {
      console.log("error", err);
    }

    console.log("added 'purpleFlame' to gameConfigV2 collection");
  });

  new gameConfigV2({
    name:"purpleFlameBoss",
    hp: 100,
    velocity: 20,
    points: 50   
  }).save((err) => {
  if (err) {
    console.log("error", err);
  }

  console.log("added 'purpleFlameBoss' to gameConfigV2 collection");
});
    }
  })

}

