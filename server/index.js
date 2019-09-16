const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes/index");

if (process.env.NODE_ENV === "dev") require("dotenv").config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(morgan("dev"));

//mongoose connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch(err => {
    console.log(err);
  });

// routes
app.use("/", routes);

app.use(errorHandler);
app.listen(port, () => {
  console.log("listening on", port);
});
