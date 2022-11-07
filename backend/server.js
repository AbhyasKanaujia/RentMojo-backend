const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
require("dotenv").config();
const connectDB = require("./configs/db.js");
const path = require("path");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
