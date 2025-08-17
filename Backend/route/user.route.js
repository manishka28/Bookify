import express from "express";
import { signup } from "../controller/user.controller.js";
import { login } from "../controller/user.controller.js";
import { refreshAccessToken,logout } from "../controller/token.controller.js";
import { authMiddleware } from "../middleware/auth.middlewar.js";
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.post("/refresh",refreshAccessToken);

router.post("/logout",authMiddleware,logout);


export default router;