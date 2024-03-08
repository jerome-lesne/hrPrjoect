const employeeRouter = require("express").Router();
const {
    setEmployee,
    blameEmployee,
    deleteEmployee,
} = require("../controllers/employeeController");
const authguard = require("../services/authguard");
const upload = require("../services/multer");

employeeRouter.post(
    "/employee/:idCompany",
    authguard,
    upload.single("image"),
    setEmployee,
);
employeeRouter.get("/blame/:id", authguard, blameEmployee);
employeeRouter.get("/delete-employee/:id", authguard, deleteEmployee);

module.exports = employeeRouter;
