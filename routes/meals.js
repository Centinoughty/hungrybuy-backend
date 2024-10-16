const { auth } = require("../middlewares/auth");
const { addItem } = require("../controllers/mealsController");

const router = require("express").Router();

router.post("/add-item", auth, addItem);

module.exports = router;
