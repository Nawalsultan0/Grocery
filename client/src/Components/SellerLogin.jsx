import React from 'react'
import { useAppContext } from '../Context/AppContext'
import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SellerLogin() {
  
    const {axios,navigate,isSeller,setisSeller } =useAppContext();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    
    useEffect(() => {
    navigate("/seller")  
    }, [isSeller]);
    
    const Onsubmithandler = async (e)=>{
        try {
          e.preventDefault();
          const {data} = await axios.post('/api/seller/login', {email,password})
            if(data.success){
              setisSeller(true)
              navigate('/seller')
            } else{
              toast.error(data.message)
            }
        } catch (error) {
          toast.error(error.message)
        }
    }
    
    return !isSeller && (
     <form onSubmit={Onsubmithandler}  
     className=' min-h-screen flex items-center text-sm text-gray-600 ' >

      <div className=' flex flex-col gap-5 m-auto items-start p-8 py-12 sm:min-w-88 rounded-lg 
      shadow-xl border border-gray-200 ' >
        <p className=' text-2xl m-auto font-medium '>
        <span className='text-primary'>Seller</span>
        Login</p>
         
         <div className='w-full'> 
          <p>Email</p>
           <input onChange={(e)=>setemail(e.target.value)} value={email} 
           type="email" placeholder='Entre your Email' required
           className=' border border-gray-200 rounded w-full p-2 mt-1 outline-primary  ' />
           </div>
            
            <div className='w-full'> 
          <p>Password</p>
           <input onChange={(e)=>setpassword(e.target.value)} value={password} 
            type="password"  placeholder='Entre your Password' required
           className=' border border-gray-200 rounded w-full p-2 mt-1 outline-primary  '/>
           </div>

           <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer '>
            Login</button>

      </div>
     </form>
  
  )
}
