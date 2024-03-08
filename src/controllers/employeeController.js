const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
const fs = require("fs");

const setEmployee = async (req, res) => {
    try {
        const company = companyModel.findOne({ _id: req.params.idCompany });
        if (company) {
            const newEmployee = new employeeModel(req.body);
            newEmployee.blames = 0;
            let imgPath = req.file.path;
            imgPath = imgPath.substring(imgPath.indexOf("/"));
            newEmployee.image = imgPath;
            newEmployee.validateSync();
            await newEmployee.save();
            await companyModel.updateOne(
                { _id: req.params.idCompany },
                { $push: { employees: newEmployee.id } },
            );
            res.redirect("/add-employee");
        } else {
            res.json("company not found");
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
            await employeeModel.deleteOne({ _id: req.params.id });
            fs.unlink("public" + employee.image, (err) => {
                err ? console.log(err) : console.log("project image deleted");
            });
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
        const employee = await employeeModel.findOne({ _id: req.params.id });
        await employeeModel.deleteOne({ _id: req.params.id });
        fs.unlink("public" + employee.image, (err) => {
            err ? console.log(err) : console.log("project image deleted");
        });
        res.redirect("/dashboard");
    } catch (e) {
        res.send(e);
    }
};

module.exports = { setEmployee, blameEmployee, deleteEmployee };
