import { createPayment, payout } from "../controllers/payment.controller";
import { router } from "./router";

router.post("/create-payment", createPayment)
router.post("/payout", payout)

export default router