
const User = require("../models/user.model");

exports.allAccess = (req, res) => {
  res.status(200).send(" minimalist survival roguelite game");
};

exports.userBoard =  async(req, res) => { 
  try {
  const games = await User.findById(req.body.id).select("games")
  
  if (games=== null){
    res.status(204).send("no games")
    console.log( req.body.id+ ": " +"no games")
    return
  }
  console.log(games)
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

      const user = await User.findById(req.body.id);
      user.games.push(newGame);
      await user.save();
  
      
      res.status(201).send("Saved score");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

