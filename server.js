const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const pagesRouter = require("./src/routes/pagesRoutes");
const userRouter = require("./src/routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.secretKey,
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(pagesRouter);
ppp.use(userRouter);

app.listen(process.env.PORT, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log("server connected");
    }
});

mongoose.connect(process.env.dbURI);
