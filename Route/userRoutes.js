
const express = require("express");

const authController = require("../controllers/authController");

const auth = require('../middleware/auth');

const router = express.Router();

router.use (express.urlencoded({ extended: true }));

router.use(express.json());



// POST /api/v1/users/signup
router.get("/",  authController.getAllUser);

router.get("/:id",  authController.findOne);

router.put("/:id",  authController.update);

router.post("/signup", authController.signup);

router.post('/login', authController.login);

module.exports = router;