const expressAsyncHandler = require('express-async-handler')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const upload = require('./../middlewares/multer')
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)


// POST /api/product
const addProduct = asyncHandler(async (req,res)=>{

    

    
    upload(req,res,async (err) => {
        if(err){
            res.status(400).json({
                message: err,
            })
        }else{
            if(!req.file){
                res.status(400).json({
                    message: 'No image was selected!',
                })
            }else{
                const {title,category,description,price,stockQuantity} = req.body;
                const file = req.file.destination;
                const fPrice = parseFloat(price)
                const iStockQuantity = parseInt(stockQuantity)
                if(fPrice === NaN || fPrice < 0){
                    deleteImage(req.file.path)
                    res.status(400).json({
                        message: "Price must be positive number",
                    })
                }else if(iStockQuantity === NaN || iStockQuantity < 0){
                    deleteImage(req.file.path)
                    res.status(400).json({
                        message: "Stock quantity must be positive integer",
                    })
                }else{
                    //insert product
                    const product = await Product.create({
                        title,
                        category,
                        description,
                        photo: file,
                        price:fPrice,
                        stockQuantity: iStockQuantity
                    });
                    if(product){
                        res.status(201).json(product);
                    }else{
                        deletImage(req.file.path)
                        res.status(400).json({
                            message: "Something went wrong try again later!",
                        })
                    }
                }
        
                
            }
        }
    })
    

})


//PATCH /api/product/:id
const updateProduct = expressAsyncHandler(async (req,res) => {
    const {title,category,description,price,stockQuantity} = req.body;
    const id = req.params.id;

    const product = await Product.findOne({id})
    if(!product){
        res.status(404).json({
            message: `product with id ${id} does not exist`
        })
    }else{
        let fPrice = product.price;
        let iStockQuantity = product.stockQuantity;
        if(price){
            fPrice = parseFloat(price)
            if(isNaN(fPrice) || fPrice < 0){
                res.status(400).json({
                    message: "Price must be positive number"
                })
            }
        }
        if(stockQuantity){
            iStockQuantity = parseInt(stockQuantity)
            if(isNaN(iStockQuantity) || iStockQuantity < 0){
                res.status(400).json({
                    message: 'Stock quantity must be positive integer'
                })
            }
        }
        product.title = title ? title : product.title
        product.description = description ? description : product.description
        product.category = category ? category : product.category
        product.price = fPrice
        product.stockQuantity = iStockQuantity
        const updatedProduct = await product.save();
        if(updatedProduct){
            res.status(200).json({
                updatedProduct
            })
        }else{
            res.status(400).json({
                message: "Something went wrong, try again later!"
            })
        }
    }
})

//GET /api/product/all
const getAllProducts = expressAsyncHandler(async (req,res)=>{
    const products = await Product.find()
    res.status(200).json(products)
})

//GET /api/product/:id
const getOneProduct = expressAsyncHandler(async (req,res) => {
    const id = req.params.id;
    const product = await Product.findOne({id})
    if(!product){
        res.status(400).json({
            message: `product with id ${id} dose not exist`
        })
    }else{
        res.status(200).json(product)
    }
})


//DELETE /api/product/:id
const deleteProduct = expressAsyncHandler(async (req,res) => {
    const id = req.params.id;
    const product = await Product.findOne({id})
    if(!product){
        res.status(400).json({
            message: `product with id ${id} does not exist`
        })
    }else{
        const result = await Product.deleteOne({id})
        if(result){
            res.status(200).json({
                message: `product with id ${id} has been deleted`
            })
        }else{
            res.status(400).json({
                message: "Somethin went wrong, try again later"
            })
        }
    }
})



const deleteImage = expressAsyncHandler(async (path) => {
    await unlinkAsync(path)
})


module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}