
import express from 'express'
import { addProduct, changeStock, productId, productList } from '../Controllers/productController.js';
import authSeller from '../Middleware/authSeller.js';
import { upload } from '../Configs/Multer.js';

const ProductRoute = express.Router();

ProductRoute.post('/add', upload.array(["images"]),authSeller,addProduct)
ProductRoute.get('/list',productList)
ProductRoute.get('/id',productId)
ProductRoute.post('/stock',authSeller,changeStock)

export default ProductRoute