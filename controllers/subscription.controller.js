import Subscription from '../models/subscription.model.js';


// Get all subscriptions (admin only)
export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error)
    }

}

// Get a single subscription
export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription
        })
    } catch (error) {
        next(error)
    }
}

// Create a new subscription

export const createSubscription = async (req, res, next) => {
    try {
        const { plan, price, currency, frequency, trialPeriod, features } = req.body;
        const subscription = await Subscription.create({
            user: req.user.id,
            plan,
            price,
            currency,
            frequency,
            trialPeriod,
            features,
        });

        res.status(201).json({
            success: true,
            data: subscription
        })
    } catch (error) {
        next(error)
    }
}

// Update a subscription
export const updateSubscription = async (req, res, next) => {

    try {
        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription
        })

    } catch (error) {
        next(error)
    }
}

// Cancel a subscription
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { status: "cancelled" },
            { new: true }
        );

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a subscription
export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(204).json({
            success: true,
            data: null, // No content to return
        });
    } catch (error) {
        next(error);
    }
};

// Get all subscriptions for a user
export const getUserSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error)
    }
}

// Get upcoming renewals
export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const renewals = await Subscription.find({
            renewalDate: { $gte: new Date() },
            status: "active",
        });

        res.status(200).json({
            success: true,
            data: renewals,
        });
    } catch (error) {
        next(error);
    }
};