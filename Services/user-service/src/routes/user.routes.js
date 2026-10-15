const router = require("express").Router();
const { register, login, getUsers, getUserById } = require("../controllers/user.controller");
const { validateRegister, validateLogin } = require("../middlewares/validateUser");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;
