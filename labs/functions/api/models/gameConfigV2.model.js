const mongoose = require("mongoose");

const gameConfigV2 = mongoose.model(
  "gameConfigV2",
  new mongoose.Schema({
   name:String,
   hp:Number,
   velocity:Number,
   points:Number

  })
);


module.exports = gameConfigV2;
