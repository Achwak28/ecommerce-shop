import Product from '../models/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// description get all products
//route GET /api/products
//access PUBLIC
const getProducts = asyncHandler( async (req,res) =>  {
    const products = await Product.find({});
    res.json(products)
});


// description get SINGLE PRODUCT BY id
//route GET /api/products/:id
//access PUBLIC
const getProductById = asyncHandler( async (req,res) =>  {
    const product = await Product.findById(req.params.id)
    //const product = products.find((p) => p._id === req.params.id)
    if(product){
       return res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product not Found !')
    }
    //res.status(404).json({message :"Product is not found !"})
});

export {getProducts, getProductById}