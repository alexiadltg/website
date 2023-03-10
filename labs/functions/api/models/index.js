const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.gameConfig = require("./gameConfig.model")
db.gameConfigV2= require("./gameConfigV2.model")
db.ROLES = ["user", "admin"];

module.exports = db;
