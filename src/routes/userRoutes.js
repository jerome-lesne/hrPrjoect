const userRouter = require("express").Router();
const {
    companySet,
    userConnect,
    userDisconnect,
} = require("../controllers/userController");

userRouter.post("/company", companySet);
userRouter.post("/connect", userConnect);
userRouter.get("/disconnect", userDisconnect);

module.exports = userRouter;
