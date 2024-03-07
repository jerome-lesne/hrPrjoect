const pagesRouter = require("express").Router();
const {
    homeRender,
    signupRender,
    loginRender,
    dashboardRender,
} = require("../controllers/pagesController");
const authguard = require("../services/authguard");

pagesRouter.get("/", homeRender);
pagesRouter.get("/signup", signupRender);
pagesRouter.get("/login", loginRender);
pagesRouter.get("/dashboard", authguard, dashboardRender);

module.exports = pagesRouter;
