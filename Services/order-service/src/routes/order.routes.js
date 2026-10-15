const router = require("express").Router();
const { create, getById, update } = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, create);

router.get("/:id", auth, getById);

router.put("/:id", auth, update);

module.exports = router;