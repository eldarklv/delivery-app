const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/ApiRoutes");
const passport = require("passport");
const session = require("express-session");
const SocketModule = require("./modules/SocketModule");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

require("dotenv").config();
require("./config/passportConf");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
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

SocketModule(io);

mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
