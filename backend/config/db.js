import mongoose from "mongoose";

// This function hooks up the server to the DB.
export const connectDB = async () => {
    try {
        // this establishes connection to the Database
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // 1 code means exited with failure, 0 means success.
    }
}