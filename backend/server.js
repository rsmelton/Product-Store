import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get("/products", (req, res) => {
    // this will be used to get all of the products from the database.
});

console.log(process.env.MONGO_URI);

app.listen(5001, () => {
    console.log('server started at http://localhost:5001');
});