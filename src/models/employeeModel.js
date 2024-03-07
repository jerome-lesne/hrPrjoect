const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
    },
    blames: {
        type: Number,
    },
});

const employeeModel = mongoose.model("employees", employeeSchema);

module.exports = employeeModel;
