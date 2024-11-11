const { Router } = require("express");
const router = Router();

//controller
const controller = require("../controllers/user.controller");

//login
router.route("/login").post(controller.login);


module.exports = router;

