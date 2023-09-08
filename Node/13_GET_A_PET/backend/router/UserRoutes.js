import express from 'express'
import UserController from '../controllers/UserControllers.js'
const router = express.Router()

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;