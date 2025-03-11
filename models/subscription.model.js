import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        plan: {
            type: String,
            enum: ["free", "basic", "pro", "enterprise"],
            default: "free",
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            enum: ["USD", "NGN"],
            default: "USD",
        },
        frequency: {
            type: String,
            enum: ["monthly", "yearly"],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "cancelled", "expired"],
            default: "active",
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        renewalDate: {
            type: Date,
            required: true,
        },
        trialPeriod: {
            type: Number, // Number of days for the trial
            default: 0,
        },
        features: {
            type: [String], // List of features (e.g., ["3D Viewer", "Analytics"])
            default: [],
        },
    },
    { timestamps: true }
);

// Auto-calculate renewal date
subscriptionSchema.pre("save", function (next) {
    const renewalPeriod = {
        monthly: 30,
        yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
        this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );

    // Auto-update status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

// export default mongoose.model("Subscription", subscriptionSchema);