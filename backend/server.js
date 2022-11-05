const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler.js");
const productRoutes = require("./routes/productRoute.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
