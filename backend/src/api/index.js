const express = require("express");
const { Router } = express;
const router = new Router();

router.use("/v1", require("./v1"));

module.exports = router;
