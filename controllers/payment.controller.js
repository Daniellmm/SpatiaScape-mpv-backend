import Paystack from "paystack";
import User from "../models/user.model.js";
import { TEST_SECRET_KEY } from '../config/env.js'

const paystack = Paystack(TEST_SECRET_KEY);


//initialize payment
export const initializePayment = async (req, res, next) => {
    try {
        const { email, plan, amount } = req.body;

        //create a payment record
        const payment = await paystack.create({
            userId: req.user.id,
            plan,
            amount,
            status: 'pending'
        });

        //initialize payment
        const response = await paystack.transaction.initialize({
            email,
            amount: amount * 100,
            metadata: {
                userId: req.user.id,
                paymentId: payment.id
            }
        });

        res.status(200).json({
            success: true,
            data: response.data
        })
    } catch (error) {
        next(error)
    }
};


//verify payment
export const verifyPayment = async (req, res) => {
    try {
        const { reference } = req.query;

        //verify payment
        const response = await paystack.transaction.verify(reference);

        if (response.data.status === 'success') {
            const { paymentId, userId } = response.data.metadata;

            //update payment status
            await Payment.findByIdAndUpdate(paymentId, { status: 'success' });

            //update user's plan
            await User.findByIdAndUpdate(userId, { plan: response.data.metadata.plan });

            res.status(200).json({
                success: true, data: response.data
            });
        } else {
            res.status(400).json({
                success: false, error: "Payment Failed"
            })
        }

        
    } catch (error) {
        next(error)
    }
};


export const handWebhook = async (req, res) => {
    try {
        const event = req.body;


        //Verify the event from Paystack 
        const hash = crypto
            .createHmac("sha512", TEST_SECRET_KEY)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (hash !== req.headers["x-paystack-signature"]) {
            return res.status(400).json({
                error: "Invalid Signature"
            })
        }

        //Handle the event 
        switch (event.event) {
            case "charge.success":
                const { paymentId, userId } = event.data.metadata;

                // Update payment status
                await Payment.findByIdAndUpdate(paymentId, { status: "success" });

                // Update user's plan
                await User.findByIdAndUpdate(userId, { plan: event.data.metadata.plan });
                break;

            default:
                console.log("Unhandled event:", event.event);
        }

        res.status(200).json({ success: true });



    } catch (error) {
        next(error)
    }
}