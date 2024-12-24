import { Request, Response } from "express";
import { checkout } from "../services/services.payment";
import { UserModel } from "../models/user.model";
import axios from "axios";
import * as uuid from 'uuid'
import { PaymentModel } from "../models/payment.model";
import { IConfirmationType } from "@a2seven/yoo-checkout";

export async function createPayment(req: Request, res: Response): Promise<void> {
  const { amount, email } = req.body;

  try {

    const payload = {
    amount: {
        value: amount,
        currency: "RUB",
    },
    confirmation: {
        type: 'redirect' as IConfirmationType, 
        return_url: "https://t.me/e_vito_bot",
    },
    description: `Payment for ${email || "unknown user"}`,
    };


    const paymentResponse = await checkout.createPayment(payload);

    console.log("Платеж успешно создан:", paymentResponse);

    if (!paymentResponse.id) {
      throw new Error('Payment ID is missing from the response');
    }

    const paymentData = {
      paymentId: paymentResponse.id,
      amount: paymentResponse.amount.value,
      currency: paymentResponse.amount.currency,
      isPaid: paymentResponse.paid,
      confirmationUrl: paymentResponse.confirmation.confirmation_url,
      createdAt: new Date(paymentResponse.created_at),
      status: paymentResponse.status,
      flag: 'pending',
    };

    await PaymentModel.createPayment(paymentData, email);

    console.log("Платеж сохранен в базе данных.");

    res.status(200).json({ confirmationUrl: paymentResponse.confirmation.confirmation_url });

    setInterval(async () => await getPayment(paymentResponse.id, email), 3000);

  } catch (error: any) {
    console.error("Ошибка при создании платежа:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function getPayment(paymentId: string, email: string): Promise<any>{
    try {

        const getPaymentResponse = await checkout.getPayment(paymentId)
        
        if (getPaymentResponse.status !== "succeeded" && !getPaymentResponse.paid){
            PaymentModel.updatePaymentStatus(getPaymentResponse.id, getPaymentResponse.status)
            console.log(getPaymentResponse)
            return getPaymentResponse
        }
        await checkout.capturePayment(paymentId, getPaymentResponse)
        PaymentModel.updatePaymentStatus(getPaymentResponse.id, getPaymentResponse.status)
        UserModel.updateUserBalance(email, Number(getPaymentResponse.amount))
        console.log(getPaymentResponse)
        return getPaymentResponse
    } catch (error) {
        console.log(error)
    }

}

export async function payout(req: Request, res: Response){

    const {amount, email, bankId} = req.body

    try {
        const response = await axios.post("https://api.yookassa.ru/v3/payouts", {
            amount: {
                value: amount,
                currency: "RUB"
            },
            payout_destination_data: {
                type: "spb",
                email: email,
                bank_id: bankId
            },
            describtion: "Вывод",
            metadata: {
                order_id: "1"
            }
        },{
            headers: {
                "Idempotence-Key": uuid.v4(),
                "Content-Type": "application/json"
            },
            auth: {
                //TODO: Подставить значения из .env
                username: String(),
                password: String()
            }
        })

        await UserModel.updateUserBalance(email, amount)
        res.json({payoutData: response})
    } catch (error) {
        
    }
}

export async function listPayments(req: Request, res: Response){
    await checkout.getPaymentList()
}
