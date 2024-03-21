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

const upload = multer({ storage: storage });

module.exports = upload;
