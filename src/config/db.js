import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            logger.error('MONGO_URI is not defined');
            process.exit(1);
        }
        await mongoose.connect(dbURI)
        logger.info('MongoDB connected')

    } catch (error) {
        logger.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

export default connectDB