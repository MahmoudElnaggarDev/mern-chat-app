const express = require("express");
const mongoose = require("mongoose");
const app = express();
const chatRouter = require("./routes/messageRouter");

require("dotenv").config();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/messages", chatRouter);

mongoose
  .connect(mongo_uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to database & Listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
