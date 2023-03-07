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

  app.get("/api/public/landing", controller.allAccess);
  app.get("/api/public/config", controller.allAccessConfig);

  app.get("/api/user/userboard", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/admin/adminboard",
    [authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard
  );

  app.post('/api/user/newgame',[authJwt.verifyToken],controller.newGame);
  app.post('/api/admin/newconfig',controller.newConfig)
};
