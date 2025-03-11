import Model from "../models/model.model.js";

export const checkPlanLimits = async (req, res, next) => {
    const user = req.user;
    const modelCount = await Model.countDocuments({ userId: user._id });

    switch (user.plan) {
        case "free":
            if (modelCount >= 5) {
                return res.status(403).json({ error: "Free plan limit reached (max 5 models)" });
            }
            break;

        case "basic":
            if (modelCount >= 20) {
                return res.status(403).json({ error: "Basic plan limit reached (max 20 models)" });
            }
            break;

        case "pro":
            if (modelCount >= 50) {
                return res.status(403).json({ error: "Pro plan limit reached (max 100 models)" });
            }
            break;

        case "enterprise":
            // No limit for enterprise users
            break;

        default:
            return res.status(400).json({ error: "Invalid plan" });
    }

    next();
};