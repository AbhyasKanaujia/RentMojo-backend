const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get all products" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Craete a product" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Get a product" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Update a product" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Delete a product" });
});

module.exports = router;
