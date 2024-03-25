const companyModel = require("../models/companyModel");
const bcrypt = require("bcrypt");

const companySet = async (req, res) => {
    try {
        const mails = await companyModel.find({}, "mail");
        mails.forEach((mail) => {
            if (mail.mail == req.body.mail) {
                throw { mail: "This mail already exist" };
            }
        });
        if (req.body.password == req.body.confirmPassword) {
            const company = new companyModel(req.body);
            await company.save();
            res.redirect("/login");
        } else {
            throw { confirmPassword: "Passwords doesn't match" };
        }
    } catch (e) {
        res.render("signup/index.html.twig", {
            error: e,
        });
    }
};

const companyEdit = async (req, res) => {
    try {
        const ownMail = await companyModel.findOne({
            _id: req.session.company._id,
        });
        if (req.body.mail != ownMail.mail) {
            const mails = await companyModel.find({}, "mail");
            mails.forEach((mail) => {
                if (mail.mail == req.body.mail) {
                    throw { mail: "This mail is already taken" };
                }
            });
        }
        await companyModel.updateOne(
            { _id: req.session.company._id },
            req.body,
            { runValidators: true },
        );
        res.redirect("/dashboard");
    } catch (e) {
        res.render("editCompany/index.html.twig", {
            company: await companyModel.findById(req.session.company._id),
            authguard: true,
            error: e,
        });
    }
};

const passwordReset = async (req, res) => {
    try {
        const company = await companyModel.findById(req.session.company._id);
        if (await bcrypt.compare(req.body.currentPassword, company.password)) {
            if (req.body.password == req.body.confirmPassword) {
                await companyModel.updateOne(
                    { _id: req.session.company._id },
                    { password: req.body.password },
                    { runValidators: true },
                );
                req.session.destroy();
                res.redirect("/login");
            } else {
                throw { confirmPassword: "Passwords doesn't match" };
            }
        } else {
            throw { currentPassword: "Current password error" };
        }
    } catch (e) {
        res.render("editCompany/index.html.twig", {
            company: await companyModel.findById(req.session.company._id),
            authguard: true,
            error: e,
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

module.exports = {
    companySet,
    userConnect,
    userDisconnect,
    companyEdit,
    passwordReset,
};
