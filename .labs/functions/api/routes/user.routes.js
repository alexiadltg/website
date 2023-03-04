const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const User = require("../models/user.model");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post('/api/user/newgame',[authJwt.verifyToken], async (req, res) => {
    try {
      
      const newGame = {
        score: req.body.score,
        time: req.body.time,
      };

      const user = await User.findById(req.body.id);
      user.games.push(newGame);
      await user.save();
  
      // Return the updated games array
      res.status(200).send("Saved score");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
};
