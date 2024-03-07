const userRouter = require("express").Router();
const { companySet, userConnect } = require("../controllers/userController");

userRouter.post("/company", companySet);
userRouter.post("/connect", userConnect);

module.exports = userRouter;
