import { login, register } from "../controllers/auth.controller";
import { authenticateJwt } from "../middleware/auth.middleware";
import { router } from "./router";
router.post("/register", register);
router.post("/login", authenticateJwt, login);
export default router;
