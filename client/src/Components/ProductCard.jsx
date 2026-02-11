import React from 'react'
import { assets } from '../assets/assets';
import { AppContext, useAppContext } from '../Context/Appcontext';
import { dummyProducts } from '../assets/assets';
import { useContext } from 'react';

export default function ProductCard({product}) {

    const {currency,addtocart,updatetocart,removetocart, navigate,carditem}= useContext(AppContext);
   
 
    return product &&(
        <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}}
         className="border bordeprimary/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" 
                src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} />
            </div>
            <div className="texprimary/60 text-sm text-gray-400/80">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                         <img key={i} src={i < 4 ? assets.star_icon:assets.star_dull_icon} className='md:w-3.5 w3' alt="" />
                        
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                 <p className="md:text-xl text-base font-medium text-primary">
                 {currency}{product.offerPrice}{" "}
                 <span className="texprimary/60 md:text-sm text-xs line-through">
                 {currency}{product.price}</span>
                 </p>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                    }}  className="text-primary">
                        {(!carditem || !carditem[product._id])? ( 
                            <button className="flex items-center justify-center gap-1 bg-gray-100 border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-shadow-primary-dull font-medium  cursor-pointer "
                             onClick={() => addtocart(product._id)} >
                                <img src={assets.cart_icon} alt="Cart icon" className='' />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() =>{removetocart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{carditem[product._id]}</span>
                                <button onClick={() => {addtocart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
