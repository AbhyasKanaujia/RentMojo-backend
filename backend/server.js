const express = require("express");
const productRoutes = require("./routes/productRoute.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/products", productRoutes);

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
