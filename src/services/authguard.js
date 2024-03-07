const companyModel = require("../models/companyModel");

const authguard = async (req, res, next) => {
    try {
        if (req.session.company) {
            let company = await companyModel.findOne({
                email: req.session.company.email,
            });
            if (company) {
                return next();
            }
        }
        throw new Error("company not connected");
    } catch (e) {
        console.log(e.message);
        res.status(401).render("login/index.html.twig", {
            errorAuth: e.message,
        });
    }
};

module.exports = authguard;
