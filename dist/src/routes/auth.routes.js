import { login, register } from "../controllers/auth.controller.js";
import { authenticateJwt } from "../middleware/auth.middleware.js";
import { router } from "./router.js";
router.post("/register", register);
router.post("/login", authenticateJwt, login);
export default router;
