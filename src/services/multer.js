const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/assets/images/employees");
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname.replace(/ /g, "_");
        cb(null, fileName);
    },
});

const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        req.errorMulter = "Only image file allowed ! (jpg,jpeg,png,gif,webp)";
        cb(null, false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
