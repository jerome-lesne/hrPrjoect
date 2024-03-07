const employeeRouter = require("express").Router();
const setEmployee = require("../controllers/employeeController");
const authguard = require("../services/authguard");
const upload = require("../services/multer");

employeeRouter.post(
    "/employee/:idCompany",
    authguard,
    upload.single("image"),
    setEmployee,
);

module.exports = employeeRouter;
