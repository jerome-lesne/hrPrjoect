const companyModel = require("../models/companyModel");

const companySet = async (req, res) => {
    try {
        const company = new companyModel(req.body);
        await company.save();
        res.redirect("/login");
    } catch (e) {
        console.log(e.errors);
        res.render("signin/index.html.twig", {
            error: e.errors,
        });
    }
};

module.exports = companySet;
