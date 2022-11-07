const express = require("express");

const router = express.Router();

router
  .route("/:userId")
  .get((req, res) => {
    res.status(200).json({ message: `Get cart for user ${req.params.userId}` });
  })
  .put((req, res) => {
    res
      .status(200)
      .json({ messag: `Update cart for user ${req.params.userId}` });
  })
  .delete((req, res) => {
    res.status(200).json({ message: `Clear cart for user` });
  });

module.exports = router;
