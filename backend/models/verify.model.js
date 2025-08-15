import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Verify", verifySchema);
