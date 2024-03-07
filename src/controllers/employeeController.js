const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
const fs = require("fs");

const setEmployee = async (req, res) => {
    try {
        company = companyModel.findOne({ _id: req.params.idCompany });
        if (company) {
            const newEmployee = new employeeModel(req.body);
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

module.exports = setEmployee;
