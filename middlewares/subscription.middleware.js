const validateSubscription = (req, res, next) => {
    const {plan, price, frequency} = req.body;

    if (!plan || !price || !frequency) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // if (price < 0) {
    //     return res.status(400).json({ success: false, error: "Price must be positive" });
    // }

    next();
}

export default validateSubscription;