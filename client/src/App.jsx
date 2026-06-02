import React from 'react'
import Navbar from './Components/Navbar'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './Components/Footer'
import { useAppContext } from './Context/AppContext'
import Loginfoam from './Components/Loginfoam';
import AllProduct from './Pages/AllProduct';
import ProductCategory from './Pages/ProductCategory';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import AddAddress from './Pages/AddAddress';
import Myorders from './Pages/Myorders'
import SellerLogin from './Components/SellerLogin'
import SellerLayOut from './Pages/Seller/SellerLayOut'
import AddProduct from './Pages/Seller/AddProduct'
import ProductList from './Pages/Seller/ProductList'
import Orders from './Pages/Seller/Orders'
import Loading from './Components/Loading'

export default function App() {

  const isSellerpath =useLocation().pathname.includes("seller")
  const {showuserlogin, isSeller} =useAppContext();

  return (
    <div    className='  text-default min-h-screen text-gray-700 bg-white ' >
      {isSellerpath? null:  <Navbar/>}
      {
        showuserlogin ? <Loginfoam/>:null
      }
      
     <Toaster/>
      <div className={`${isSellerpath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
         <Routes>
          <Route path='/'element={<Home/>} />
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<Myorders/>}/>
          
          <Route path='/loader' element={<Loading/>}/>
          
          <Route path='/seller' element={isSeller ? <SellerLayOut/> : <SellerLogin/> } >
          <Route index element={ isSeller? <AddProduct/> : null} />
          <Route path='product-list' element={<ProductList/>} />
          <Route path='orders' element={<Orders/>} />
           </Route>
          </Routes>

      </div>
      {!isSellerpath && <Footer/>}
    </div>
      
  )
}
