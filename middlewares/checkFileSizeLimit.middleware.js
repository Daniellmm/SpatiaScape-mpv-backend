export const checkFileSizeLimit = async (req, res, next) => {
    const user = req.user;
    const fileSize = req.file.size; // File size in bytes

    switch (user.plan) {
        case "free":
            if (fileSize > 100 * 1024 * 1024) { // 100 MB
                return res.status(403).json({ error: "Free plan file size limit exceeded (max 100 MB)" });
            }
            break;

        case "basic":
            if (fileSize > 500 * 1024 * 1024) { // 500 MB
                return res.status(403).json({ error: "Basic plan file size limit exceeded (max 500 MB)" });
            }
            break;

        case "pro":
            if (fileSize > 1 * 1024 * 1024 * 1024) { // 1 GB
                return res.status(403).json({ error: "Pro plan file size limit exceeded (max 1 GB)" });
            }
            break;

        case "enterprise":
            // No file size limit for enterprise users
            break;

        default:
            return res.status(400).json({ error: "Invalid plan" });
    }

    next();
};