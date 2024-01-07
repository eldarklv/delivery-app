const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");
const passport = require("passport")
const session = require("express-session");
require("dotenv").config();
require("./config/passportConf");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRouter);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
console.log("LOOK", MONGO_URL);

mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
