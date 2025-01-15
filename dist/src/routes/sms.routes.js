import { verifyCode } from "../controllers/email.conrtoller";
import { router } from "./router";
router.post("/verify-code", verifyCode);
export default router;
