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

const companyEdit = async (req, res) => {
    try {
        await companyModel.updateOne(
            { _id: req.session.company._id },
            req.body,
        );
        res.redirect("/dashboard");
    } catch (e) {
        res.render("editCompany/index.html.twig", {
            company: await companyModel.findById(req.session.company._id),
            authguard: true,
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

const userDisconnect = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/login");
    } catch (e) {
        res.json(e);
    }
};

module.exports = { companySet, userConnect, userDisconnect, companyEdit };
