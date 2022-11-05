const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
