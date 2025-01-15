import { Payment } from "./databaseModel/payment.model.js";
export class PaymentModel {
    static async createPayment(payload, userId) {
        return Payment.create({
            paymentid: payload.id,
            status: payload.status,
            isPaid: payload.isPaid,
            flaf: payload.flag,
            email: userId
        });
    }
    static async updatePaymentStatus(paymentId, paymentStatus) {
        const payment = Payment.findOne({
            where: {
                id: paymentId
            }
        });
        Payment.update({ status: paymentStatus }, { where: { payment } });
    }
}
