

import express from 'express'
import { issellerAuth, sellerLogin, sellerlogOut } from '../Controllers/sellerController.js';
import authSeller from '../Middleware/authSeller.js';

const sellerRoutes = express.Router();

sellerRoutes.post('/login',sellerLogin);
sellerRoutes.get('/is-auth',authSeller,issellerAuth);
sellerRoutes.get('/logout',sellerlogOut);


export default sellerRoutes;