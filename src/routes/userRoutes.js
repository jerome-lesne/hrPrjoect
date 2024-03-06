const userRouter = require("express").Router();
const companySet = require("../controllers/userController");

userRouter.post("/company", companySet);
userRouter.post("/connect");

module.exports = userRouter;
