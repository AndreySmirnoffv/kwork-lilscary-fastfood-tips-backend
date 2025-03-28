import { csrfProtection } from "../..";
import { createPayment, payout } from "../controllers/payment.controller";
import { router } from "./router";

router.post("/create-payment", csrfProtection, createPayment)
router.post("/payout", csrfProtection, payout)

export default router