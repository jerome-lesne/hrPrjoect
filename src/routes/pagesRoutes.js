const pagesRouter = require("express").Router();
const {
    homeRender,
    signupRender,
    loginRender,
    dashboardRender,
    addEmployeeRender,
} = require("../controllers/pagesController");
const authguard = require("../services/authguard");

pagesRouter.get("/", homeRender);
pagesRouter.get("/signup", signupRender);
pagesRouter.get("/login", loginRender);
pagesRouter.get("/dashboard", authguard, dashboardRender);
pagesRouter.get("/add-employee", authguard, addEmployeeRender);

module.exports = pagesRouter;
