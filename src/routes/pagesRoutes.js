const pagesRouter = require("express").Router();
const {
    homeRender,
    signinRender,
    loginRender,
    dashboardRender,
} = require("../controllers/pagesController");
const authguard = require("../services/authguard");

pagesRouter.get("/", homeRender);
pagesRouter.get("/signin", signinRender);
pagesRouter.get("/login", loginRender);
pagesRouter.get("/dashboard", authguard, dashboardRender);

module.exports = pagesRouter;
