import React, { useEffect } from 'react'
import { useAppContext } from '../Context/Appcontext'
import { useState } from 'react';
import ProductCard from '../Components/ProductCard';

export default function AllProduct() {
   const {products,searchQuery,setsearchQuery} = useAppContext();
   const [filterproducts, setfilterproducts] = useState([])

   useEffect(()=>{
    
    if(searchQuery.length > 0) {
        
        setfilterproducts(
        products.filter( product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    }else{
        setfilterproducts(products)
    }
    console.log("products",products);
   },[products,searchQuery])

  return (
    <div  className=' mt-16 flex flex-col' >
     <div  className='flex flex-col   items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full '></div>
     </div>
     
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
      gap-3 md:gap-6 lg:grid-cols-5 mt-6 ml-3 mr-3'>
       {Array.isArray(filterproducts) ? (
        filterproducts.filter((product)=>
            product.inStock).map((product,index)=>(
                <ProductCard  key={index} product={product}/>
            ))
        ):(
            <p>No products found</p>
        )
       }
      </div>
    </div>
  )
}
