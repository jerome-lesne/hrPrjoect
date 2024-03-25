const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(v);
            },
            message: "Please insert a valid Email",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees",
        },
    ],
});

companySchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        next();
    });
});

companySchema.pre("updateOne", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        next();
    });
});

const companyModel = mongoose.model("company", companySchema);
module.exports = companyModel;
