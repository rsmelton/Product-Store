import mongoose from "mongoose";
import Product from '../../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        // using {} in the find method grabs all 
        // products that exist
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const postProduct = async (req, res) => {
    // we will get this from the user
    const product = req.body;

    // if the user does not provide every field, then we return
    // a response asking them to do so since these fields are required.
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all the fields." });
    }

    const newProduct = new Product(product);

    try {
        // this saves the newProduct that was created to our database.
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    // req.params is in postman
    const { id } = req.params;
    const product = req.body;

    // Here we check to see if the product even exists in the DB.
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: "Product not found." });
    }

    try {
        // .findByIdAndUpdate takes three params: id, product, and {new:true}
        // id is the specified id of the product
        // product is the old product that we want to update
        // and {new:true} specifies that we want the updated new object.
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct} );
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    // req.params is in postman
    const { id } = req.params;

    // Here we check to see if the product even exists in the DB.
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: "Product not found." });
    }

    try {
        // this finds the specific product and deletes it.
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};