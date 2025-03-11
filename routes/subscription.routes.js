import { Router } from "express";
import {
    cancelSubscription, createSubscription, deleteSubscription,
    getSubscription, getSubscriptions, getUpcomingRenewals, getUserSubscriptions,
    updateSubscription
} from "../controllers/subscription.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscription);

subscriptionRouter.post('/', createSubscription);

subscriptionRouter.put('/:id', updateSubscription);

subscriptionRouter.delete('/:id', deleteSubscription);

subscriptionRouter.put('/:id/cancel', cancelSubscription);

subscriptionRouter.get('/user/:id', getUserSubscriptions);
subscriptionRouter.get('/upcoming-renewals', getUpcomingRenewals);


export default subscriptionRouter;