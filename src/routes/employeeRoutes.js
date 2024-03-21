const employeeRouter = require("express").Router();
const {
    setEmployee,
    blameEmployee,
    deleteEmployee,
    updateEmployee,
} = require("../controllers/employeeController");
const { dashboardRender } = require("../controllers/pagesController");
const authguard = require("../services/authguard");
const upload = require("../services/multer");

employeeRouter.post(
    "/employee",
    authguard,
    upload.single("image"),
    setEmployee,
);
employeeRouter.get("/blame/:id", authguard, blameEmployee);
employeeRouter.get("/delete-employee/:id", authguard, deleteEmployee);
employeeRouter.post(
    "/update-employee/:id",
    authguard,
    upload.single("image"),
    updateEmployee,
);
employeeRouter.get("/role-filter", authguard, dashboardRender);

module.exports = employeeRouter;
