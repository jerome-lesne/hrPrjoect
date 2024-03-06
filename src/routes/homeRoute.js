const homeRouter = require("express").Router();
const homeRender = require("../controllers/homeController");

homeRouter.get("/", homeRender);

module.exports = homeRouter;
