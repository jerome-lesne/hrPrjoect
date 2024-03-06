const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Company name is required"],
    },
    siret: {
        type: Number,
        required: [true, "Siret is required"],
    },
    ceo: {
        type: String,
        required: [true, "CEO is required"],
    },
    mail: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});

const companyModel = mongoose.model("company", userSchema);
module.exports = companyModel;
