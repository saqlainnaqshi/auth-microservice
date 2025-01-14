import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
});

export default mongoose.model('RefreshToken', RefreshTokenSchema);
