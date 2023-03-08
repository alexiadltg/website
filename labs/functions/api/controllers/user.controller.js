
const User = require("../models/user.model");
const db = require("../models");
const gameConfig = db.gameConfig;



exports.allAccess = (req, res) => {
  res.status(200).send(" minimalist survival roguelite game");
};

exports.allAccessConfig = async (req, res) => {
  try {
    const config = await gameConfig.find({"name":"gameConfigDefault"})

    if (config === null) {
      res.status(204).send("no config")
      return
    }
    res.status(200).send(config);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

};

exports.userBoard = async (req, res) => {
  try {
    const games = await User.findById(req.userId).select("games")

    if (games === null) {
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
  try {
    const Users = await User.find({})

    if (Users === null) {
      res.status(204).send("no users")
      return
    }
    res.status(200).send(Users);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
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

exports.newConfig = async (req, res) => {
  const gameConfigData = req.body;
  const newGameConfig = new gameConfig(gameConfigData);
  try {
    const savedGameConfig = await newGameConfig.save();
    res.status(201).json(savedGameConfig);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.body._id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.deleteUser =(req,res) =>{
  if (!req.body) {
    return res.status(400).send({
      message: "User to update can not be empty!"
    });
  }

  const id = req.body._id

  User.findByIdAndDelete(id) 
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    } else {
      res.send({
        message: "User was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
};