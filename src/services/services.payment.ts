import { YooCheckout } from "@a2seven/yoo-checkout";
import dotenv from 'dotenv'

dotenv.config()

export const checkout = new YooCheckout({
    shopId: String(process.env.YOOKASSA_SHOP_ID),
    secretKey: String(process.env.YOOKASSA_SECRET_KEY)
})