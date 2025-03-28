import { csrfProtection } from "../..";
import { verifyCode } from "../controllers/email.conrtoller";
import { router } from "./router";

router.post("/verify-code", csrfProtection, verifyCode)

export default router