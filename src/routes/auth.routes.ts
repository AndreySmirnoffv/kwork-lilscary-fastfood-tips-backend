import { login, register } from "../controllers/auth.controller";
import { router } from "./router";
import { authenticateJwt } from "../middleware/auth.middleware";

router.post("/register", register);
router.post("/login", authenticateJwt, login);

export default router;