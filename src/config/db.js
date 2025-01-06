import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            console.error('MONGO_URI is not defined');
            process.exit(1);
        }
        await mongoose.connect(dbURI)
        console.log('MongoDB connected')

    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

export default connectDB