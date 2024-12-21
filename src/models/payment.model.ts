import { ICreatePayment } from "@a2seven/yoo-checkout";
import { IPayment } from "../types/IPayment";
import { Payment } from "./databaseModel/payment.model";

export class PaymentModel{
    static async createPayment(payload, email: string){
        return Payment.create({
            id: payload.id,
            status: payload.status,
            isPaid: payload.isPaid,
            flaf: payload.flag,
            email: email
        })
    }

    static async updatePaymentStatus(paymentId: string, paymentStatus: string){
        const payment = Payment.findOne({
            where: {
                id: paymentId
            }
        })

        Payment.update({status: paymentStatus}, {where: {payment}})
    }
}