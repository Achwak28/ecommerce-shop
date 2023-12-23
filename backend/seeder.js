import monngoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from './config/db.js'

dotenv.config();

connectDB();


const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            return {...product, user : adminUser}
        })
        
        await Product.insertMany(sampleProducts);
        console.log('data inserted successfully !')
        process.exit()
    } catch (error) {
        console.log(`error message ${error.message}`)
        process.exit(1)
    }
}

const destroyData = async () =>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany()

        console.log('data has been destroyed')
        process.exit()
    } catch (error) {
        console.log(`error message ${error.message}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
  