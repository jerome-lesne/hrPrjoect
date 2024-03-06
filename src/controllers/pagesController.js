const homeRender = (req, res) => {
    try {
        res.render("home/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

const signinRender = (req, res) => {
    try {
        res.render("signin/index.html.twig", {});
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
        res.render("dashboard/index.html.twig");
    } catch (e) {
        res.send(e);
    }
};

module.exports = { homeRender, signinRender, loginRender, dashboardRender };
