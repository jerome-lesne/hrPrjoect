const signinRender = (req, res) => {
    try {
        res.render("signin/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

module.exports = signinRender;
