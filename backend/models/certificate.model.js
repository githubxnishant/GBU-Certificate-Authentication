import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    certificateId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    studentName: { 
        type: String, 
        required: true 
    },
    rollNo: { 
        type: String, 
        required: true 
    },
    fest: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    event: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

export default mongoose.model("Certificate", certificateSchema);
