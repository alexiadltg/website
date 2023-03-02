const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

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

  app.post('/api/games',[authJwt.verifyToken], async (req, res) => {
    try {
      
      // Create a new game object from the request body
      const newGame = {
        score: req.body.score,
        time: req.body.time,
      };
  
      // Use Mongoose to find the user by their ID and push the new game to their games array
      const user = await User.findById(decoded.id);
      user.games.push(newGame);
      await user.save();
  
      // Return the updated games array
      res.send(user.games);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
};
