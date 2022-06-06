const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: String,
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
});

module.exports = mongoose.model("Product", ProductSchema);