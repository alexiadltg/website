module.exports = {
  // HOST: "labs.inspedralbes.cat",
  // PORT: 7010,
  // DB: "DAMA_Grup7",
  HOST: process.env.MONGO_HOST || "127.0.0.1",
  PORT: process.env.MONGO_PORT || 27017,
  DB: process.env.MONGO_DB || "deheroes",
};
