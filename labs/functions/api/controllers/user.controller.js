
const User = require("../models/user.model");
const db = require("../models");
const gameConfig = db.gameConfig;



exports.allAccess = (req, res) => {
  res.status(200).send(" minimalist survival roguelite game");
};

exports.userBoard =  async(req, res) => { 
  try {
  const games = await User.findById(req.userId).select("games")
  
  if (games=== null){
    res.status(204).send("no games")
    return
  }
  res.status(200).send(games);

} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
}
  };

exports.adminBoard = async (req, res) => {
  res.status(200).send("admin Content.");
}

exports.newGame = async (req, res) => {
    try {
      const newGame = {
        score: req.body.score,
        time: req.body.time,
      };

      const user = await User.findById(req.userId);
      user.games.push(newGame);
      await user.save();
      
      res.status(201).send("Saved score");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  exports.adminBoard = async (req, res) => {

    
    res.status(200).send("admin Content.");
  }

exports.newConfig = (req, res) => {
  const inGameConfig = new gameConfig({
    witch:[{
      hp:req.body.witch.hp ,
      speed: req.body.witch.speed
    }],
    rogue:[{
      hp:req.body.rogue.hp ,
      speed: req.body.rogue.speed
    }], 
    mob:[{
      hp:req.body.mob.hp ,
      speed: req.body.mob.speed ,
      points:req.body.mob.points
    }],
    mobBoss:[{
      hp:req.body.mobBoss.hp ,
      speed: req.body.mobBoss.speed ,
      points:req.body.mobBoss.points
    }]
  })


  inGameConfig.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "new Game Config " });

  });
};


  