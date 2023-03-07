const mongoose = require("mongoose");

const gameConfig = mongoose.model(
    "gameConfig",
    new mongoose.Schema({
      hero:[{
        hp:Number,
        speed:Number
      }],
      mob:[{
        hp:Number,
        speed:Number,
        points:Number
      }],
      mobBoss:[{
        hp:Number,
        speed:Number,
        points:Number
      }]
    })
  );
      

module.exports = gameConfig;
