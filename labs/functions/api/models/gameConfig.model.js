const mongoose = require("mongoose");

const gameConfig = mongoose.model(
  "gameConfig",
  new mongoose.Schema({
    name: String,
    witch: {
      hp: Number,
      speed: Number
    },
    rogue: {
      hp: Number,
      speed: Number
    },
    purpleFlame: {
      hp: Number,
      speed: Number,
      points: Number
    },
    purpleFlameBoss: {
      hp: Number,
      speed: Number,
      points: Number
    }
  })
);


module.exports = gameConfig;
