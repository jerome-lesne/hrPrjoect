const companyModel = require("../models/companyModel");
const bcrypt = require("bcrypt");

const companySet = async (req, res) => {
    try {
        const company = new companyModel(req.body);
        await company.save();
        res.redirect("/login");
    } catch (e) {
        console.log(e.errors);
        res.render("signup/index.html.twig", {
            error: e.errors,
        });
    }
};

const userConnect = async (req, res) => {
    try {
        const company = await companyModel.findOne({ mail: req.body.mail });
        if (company) {
            if (await bcrypt.compare(req.body.password, company.password)) {
                req.session.company = company;
                res.redirect("/dashboard");
            } else {
                throw { password: "Wrong password" };
            }
        } else {
            throw { mail: "email not found" };
        }
    } catch (e) {
        res.render("login/index.html.twig", {
            error: e,
        });
    }
};

module.exports = { companySet, userConnect };
