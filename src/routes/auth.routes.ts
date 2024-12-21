import { Request, Response } from "express";
import { login, register } from "../controllers/auth.controller";
import { router } from "./router";

router.post("/register", register);
router.post("/login", login);

export default router;