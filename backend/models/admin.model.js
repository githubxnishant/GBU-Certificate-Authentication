import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model("admin", adminSchema);