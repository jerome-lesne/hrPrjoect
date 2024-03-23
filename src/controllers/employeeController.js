const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
const fs = require("fs");

const setEmployee = async (req, res) => {
    try {
        const companyId = req.session.company._id;
        if (companyId) {
            const newEmployee = new employeeModel(req.body);
            newEmployee.blames = 0;
            let imgPath = req.file.path;
            imgPath = imgPath.substring(imgPath.indexOf("/"));
            newEmployee.image = imgPath;
            newEmployee.validateSync();
            await newEmployee.save();
            await companyModel.updateOne(
                { _id: companyId },
                { $push: { employees: newEmployee.id } },
            );
            res.redirect("/dashboard");
        } else {
            res.redirect("/dashboard");
        }
    } catch (e) {
        res.render("addEmployee/index.html.twig", {
            error: e.errors,
        });
    }
};

const blameEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.findOne({ _id: req.params.id });
        if (employee.blames >= 3) {
            await companyModel.updateOne(
                { employees: req.params.id },
                { $pull: { employees: req.params.id } },
            );
            await employeeModel.deleteOne({ _id: req.params.id });
            fs.unlink("public" + employee.image, (err) => {});
        } else {
            const addBlame = employee.blames + 1;
            await employeeModel.updateOne(
                { _id: req.params.id },
                { blames: addBlame },
            );
        }
        res.redirect("/dashboard");
    } catch (e) {
        res.send(e);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const company = await companyModel.findOne({
            employees: req.params.id,
        });
        if (company) {
            await companyModel.updateOne(
                { employees: req.params.id },
                { $pull: { employees: req.params.id } },
            );
            const employee = await employeeModel.findOne({
                _id: req.params.id,
            });
            fs.unlink("public" + employee.image, (err) => {
                err
                    ? console.log(err)
                    : console.log(`Employee id: ${employee.id}, image deleted`);
            });
            await employeeModel.deleteOne({ _id: req.params.id });
            console.log(`Employee id: ${employee.id} deleted succesfully`);
            res.redirect("/dashboard");
        } else {
            res.json("company not found");
        }
    } catch (e) {
        res.send(e);
    }
};

const updateEmployee = async (req, res) => {
    try {
        let data = req.body;
        let imgPath = req.file.path;
        imgPath = imgPath.substring(imgPath.indexOf("/"));
        data.image = imgPath;
        const employee = await employeeModel.findOne({
            _id: req.params.id,
        });
        fs.unlink("public" + employee.image, (err) => {
            err
                ? console.log(err)
                : console.log(`Employee id: ${employee.id}, image deleted`);
        });
        await employeeModel.updateOne({ _id: req.params.id }, data);
        res.redirect("/dashboard");
    } catch (e) {
        console.log("error");
        res.send(e);
    }
};

const roleFilter = async (req, res) => {
    try {
        const company = await companyModel
            .findById(req.session.company._id)
            .populate("employees");
        const companyFilter = await companyModel
            .findById(req.session.company._id)
            .populate({ path: "employees", match: { role: req.params.role } });
        res.render("dashboard/index.html.twig", {
            employees: companyFilter.employees,
            roles: Array.from(
                new Set(company.employees.map((employee) => employee.role)),
            ),
            authguard: true,
        });
    } catch (e) {
        res.send(e);
    }
};

module.exports = {
    setEmployee,
    blameEmployee,
    deleteEmployee,
    updateEmployee,
    roleFilter,
};
