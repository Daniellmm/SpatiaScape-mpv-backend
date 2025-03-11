import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "processed", "failed"], 
        default: "pending",
    },
},
 { timestamps: true }
);

const Model = mongoose.model('Model', modelSchema);

export default Model;