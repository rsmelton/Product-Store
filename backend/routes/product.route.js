import express from 'express';
import { getProducts, postProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

// this will be used to get all of the products from the database.
router.get("/", getProducts);

router.post("/", postProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;