const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");

const homeRender = (req, res) => {
    try {
        if (req.session.company) {
            res.redirect("/dashboard");
        } else {
            res.render("home/index.html.twig", {});
        }
    } catch (e) {
        res.json(e);
    }
};

const signupRender = (req, res) => {
    try {
        if (req.session.company) {
            res.redirect("/dashboard");
        } else {
            res.render("signup/index.html.twig", {});
        }
    } catch (e) {
        res.json(e);
    }
};

const loginRender = async (req, res) => {
    try {
        if (req.session.company) {
            res.redirect("/dashboard");
        } else {
            res.render("login/index.html.twig");
        }
    } catch (e) {
        res.send(e);
    }
};

const dashboardRender = async (req, res) => {
    let company;
    try {
        if (req.query.search) {
            const searchTerm = req.query.search;
            const regex = new RegExp(searchTerm, "i");
            company = await companyModel
                .findById(req.session.company._id)
                .populate({
                    path: "employees",
                    match: { name: { $regex: regex } },
                });
        } else {
            company = await companyModel
                .findById(req.session.company._id)
                .populate("employees");
        }
        res.render("dashboard/index.html.twig", {
            employees: company.employees,
            roles: Array.from(
                new Set(company.employees.map((employee) => employee.role)),
            ),
            company: await companyModel.findById(req.session.company._id),
            authguard: true,
        });
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

const addEmployeeRender = async (req, res) => {
    try {
        const company = await companyModel
            .findById(req.session.company._id)
            .populate("employees");
        res.render("addEmployee/index.html.twig", {
            company: company,
            authguard: true,
            roles: Array.from(
                new Set(company.employees.map((employee) => employee.role)),
            ),
        });
    } catch (e) {
        res.send(e);
    }
};

const companyEditRender = async (req, res) => {
    try {
        res.render("editCompany/index.html.twig", {
            company: await companyModel.findById(req.session.company._id),
            authguard: true,
        });
    } catch (e) {
        console.log(e.errors);
    }
};

module.exports = {
    homeRender,
    signupRender,
    loginRender,
    dashboardRender,
    addEmployeeRender,
    companyEditRender,
};
