const express = require("express");
const { Router } = express;
const router = new Router();

const controller = require("./controller");
const { decryptRequest, setToken } = require("../../../../middlewares/authentication")

router.post("/signup", decryptRequest, controller.signUp);
router.post("/login", decryptRequest, controller.logIn);

module.exports = router;
