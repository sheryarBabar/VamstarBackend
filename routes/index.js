const express = require("express");
const router = express.Router();
const { taskFunction } = require("../controller/taskController.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/test", taskFunction);

module.exports = router;
