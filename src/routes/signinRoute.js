signinRouter = require("express").Router();
const signinRender = require("../controllers/signinController");

signinRouter.get("/signin", signinRender);

module.exports = signinRouter;
