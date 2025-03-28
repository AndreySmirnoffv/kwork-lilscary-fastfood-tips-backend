import { Payment } from "./databaseModel/payment.model";

export class PaymentModel{
    static async createPayment(payload: any, userId: string){
        return Payment.create({
            id: payload.id,
            status: payload.status,
            isPaid: payload.isPaid,
            flaf: payload.flag,
            email: userId
        })
    }

    static async updatePaymentStatus(paymentId: string, paymentStatus: string){
        const payment= await Payment.findOne({
            where: {
                id: paymentId
            }
        })

        Payment.update({status: paymentStatus}, {where: {payment}})
    }
}