import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

// allows mongoose to read the env we pass it
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// allows our req.body to use JSON data
app.use(express.json());

// Here we are accessing all of our different CRUD operations
// the "/api/products endpoint will get prepended to the route"
app.use("/api/products", productRoutes);

// This listens to the port we specified in the .env file 
// Command to start the server: npm run dev
app.listen(PORT, () => {
    // this runs the function to allow the connection to the database.
    connectDB();
    console.log('server started at http://localhost:' + PORT);
});