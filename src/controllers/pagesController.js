const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");

const homeRender = (req, res) => {
    try {
        res.render("home/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

const signupRender = (req, res) => {
    try {
        res.render("signup/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

const loginRender = async (req, res) => {
    try {
        res.render("login/index.html.twig");
    } catch (e) {
        res.send(e);
    }
};

const dashboardRender = async (req, res) => {
    try {
        const company = await companyModel
            .findById(req.session.company._id)
            .populate("employees");
        res.render("dashboard/index.html.twig", {
            company: company,
            roles: Array.from(
                new Set(company.employees.map((employee) => employee.role)),
            ),
        });
    } catch (e) {
        res.send(e);
    }
};

const addEmployeeRender = async (req, res) => {
    try {
        res.render("addEmployee/index.html.twig", {
            company: await companyModel.findById(req.session.company._id),
        });
    } catch (e) {
        res.send(e);
    }
};

module.exports = {
    homeRender,
    signupRender,
    loginRender,
    dashboardRender,
    addEmployeeRender,
};
