import { verifyCode } from "../controllers/email.conrtoller.js";
import { router } from "./router.js";
router.post("/verify-code", verifyCode);
export default router;
