const mongoose = require("mongoose");

const gameConfig = mongoose.model(
  "gameConfig",
  new mongoose.Schema({
    witch: [{
      hp: Number,
      speed: Number
    }],
    rogue: [{
      hp: Number,
      speed: Number
    }],
    mob: [{
      hp: Number,
      speed: Number,
      points: Number
    }],
    mobBoss: [{
      hp: Number,
      speed: Number,
      points: Number
    }]
  })
);


module.exports = gameConfig;
