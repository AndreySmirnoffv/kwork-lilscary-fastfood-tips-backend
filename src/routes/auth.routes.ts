import { login, register } from "../controllers/auth.controller";
import { router } from "./router";
import { csrfProtection } from "../..";

router.post("/register", register);
router.post("/login", login);

export default router;