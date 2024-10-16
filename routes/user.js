const { getInfo } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/get-info", auth, getInfo);

module.exports = router;
