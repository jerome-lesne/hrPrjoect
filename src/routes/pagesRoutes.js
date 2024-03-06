const pagesRouter = require("express").Router();
const {
    homeRender,
    signinRender,
    loginRender,
    dashboardRender,
} = require("../controllers/pagesController");

pagesRouter.get("/", homeRender);
pagesRouter.get("/signin", signinRender);
pagesRouter.get("/login", loginRender);
pagesRouter.get("/dashboard", dashboardRender);

module.exports = pagesRouter;
