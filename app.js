const express = require("express");
const cors = require("cors");
const router = require("./routes");
require("./models");
process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(
  express.json({})
);
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cors());


// routes
app.use("/api", router);

// catch 404 later
app.use((req, res) => {
  return res.status(404).send("Error 404, Route not found");
});

// error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  req.log.error(err);
  return res.status(500).send(err.message);
});

module.exports = app;
