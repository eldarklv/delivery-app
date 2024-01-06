const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/User");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api", userRouter);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
console.log("LOOK", MONGO_URL);

mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
