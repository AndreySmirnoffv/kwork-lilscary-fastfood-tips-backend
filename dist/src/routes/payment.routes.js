import { createPayment, payout } from "../controllers/payment.controller.js";
import { router } from "./router.js";
router.post("/create-payment", createPayment);
router.post("/payout", payout);
export default router;
