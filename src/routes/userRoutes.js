const userRouter = require("express").Router();
const {
    companySet,
    userConnect,
    userDisconnect,
    companyEdit,
    passwordReset,
} = require("../controllers/userController");

userRouter.post("/company", companySet);
userRouter.post("/connect", userConnect);
userRouter.get("/disconnect", userDisconnect);
userRouter.post("/update-company", companyEdit);
userRouter.post("/password-reset", passwordReset);

module.exports = userRouter;
