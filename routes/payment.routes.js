import { Router } from 'express';
import { handWebhook, initializePayment, verifyPayment } from '../controllers/payment.controller.js';


const paymentRouter = Router();

// initialize payment 
paymentRouter.post('/initialize', initializePayment);


//verify payment   
paymentRouter.post('/verify', verifyPayment);


// Webhook route
paymentRouter.post('/webhook', handWebhook)

export default paymentRouter;