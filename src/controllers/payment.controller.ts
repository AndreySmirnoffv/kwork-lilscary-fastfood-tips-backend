import { Request, Response } from "express";
import { checkout } from "../services/services.payment";
import { ICapturePayment, ICreatePayment } from "@a2seven/yoo-checkout";
import { UserModel } from "../models/user.model";
import axios from "axios";
import * as uuid from 'uuid'
import { PaymentModel } from "../models/payment.model";

export async function createPayment() Promise<void> {

   // const {amount, email} = req.body

    const email = "smirnoffa675@gmail.com"

    try{
        const payload: ICreatePayment = {
            amount: {
                value: "100",
                currency: "RUB"
            },
            confirmation: {
                type: 'redirect',
                return_url:  "https://t.me/e_vito_bot"
            },
        }

        // Создание платежа
        const paymentResponse = await checkout.createPayment(payload);

        console.log("Платеж успешно создан:", paymentResponse);
        console.log(paymentResponse.id)

        // Ensure paymentId is not null
        if (!paymentResponse.id) {
            throw new Error('Payment ID is missing from the response');
        }

        // Подготовка данных для сохранения
        const paymentData = {
            paymentId: paymentResponse.id,
            amount: paymentResponse.amount.value,
            currency: paymentResponse.amount.currency,
            isPaid: paymentResponse.paid,
            confirmationUrl: paymentResponse.confirmation.confirmation_url, 
            createdAt: new Date(paymentResponse.created_at), 
            status: paymentResponse.status,
            flag: 'pending'
        };

        // Сохранение в модель
       //await PaymentModel.createPayment(paymentData, email);

        console.log("Платеж сохранен в базе данных.");
        //res.json(paymentResponse.confirmation.confirmation_url);
        console.log(paymentResponse)
        setInterval(async () => await getPayment(paymentResponse.id, email), 3000);

    }catch(error){
        console.log(error);
       // res.status(500).json({ error: error.message });
    }
}

await createPayment()

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
