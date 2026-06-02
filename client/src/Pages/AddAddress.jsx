import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


//////////////////////// Input field Component  /////////////////////
const InputField = ({type, placeholder,name, handleChange,address })=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 roudeed outline-none
    text-gray-500 focus:border-primary transition'
     type={type} 
     name={name}
     placeholder={placeholder}
     onChange={handleChange}
     value={address[name]} 
      required/>
)
 


export default function AddAddress () {

   const {axios, user,navigate} = useAppContext();

  const [address, setaddress] = useState({
    
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
 
  })
  const handleChange = (e)=>{
  const { name, value } = e.target;

  
  setaddress((prevAddress)=>({
    ...prevAddress,
    [name]:value,
  }))
}
     const onsubmitHandler = async (e)=>{
        e.preventDefault();
        try {
          const {data}= await axios.post('/api/address/add',{address})
          if(data.success){
            toast.success(data.message)
            navigate('/cart')
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
        }
       useEffect(()=>{
        if(!user){
          navigate('/cart')
        }
       },[user,navigate])


  return (
    <div className='mt-16  pb-16'>
        <div className='text-2xl md:text-3xl text-gray-500  '>Add Shipping
        <span  className='font-semibold text-primary' > Address</span>
        <div className=' w-26 h-0.5 bg-primary'></div>
        <div className='flex flex-col-reverse  md:flex-row justify-between mt-10 '>
        <div className='flex-1 max-w-md' >
        <form onSubmit={onsubmitHandler} className='space-y-3 mt-6 text-sm '>

          {/*2 inputs that are first name and last name */}

         <div className='grid grid-cols-2 gap-4' >
            <InputField handleChange={handleChange} address={address} name='firstName'
             type='text' placeholder="First Name" />
            <InputField handleChange={handleChange} address={address} name='lastName'
             type='text' placeholder="last Name" />
         </div>
           <InputField handleChange={handleChange} address={address} name='email'
             type='email' placeholder="Email Address"/>

            <InputField handleChange={handleChange} address={address} name='street'
             type='text' placeholder="Street" />

         <div className='grid grid-cols-2 gap-4' >
         <InputField handleChange={handleChange} address={address} name='city'
             type='text' placeholder="City" />
             <InputField handleChange={handleChange} address={address} name='state'
             type='text' placeholder="State" />
         </div>
          
          <div className='grid grid-cols-2 gap-4' >
            <InputField handleChange={handleChange} address={address} name='zipcode'
             type='number' placeholder="Zip-code" />
            <InputField handleChange={handleChange} address={address} name='country'
             type='text' placeholder="Country" />
          </div>
           <InputField handleChange={handleChange} address={address} name='phone'
             type='text' placeholder="Phone" />

             <button className='w-full mt-6  bg-primary text-white py-3 
               hover:bg-primary-dull  transition cursor-pointer uppercase ' >
                save Address
             </button>

        </form>
        </div>
        <img src={assets.add_address_iamge} alt="Address" className='md:mr-16 mb-16 md:mt-0' />
        </div>
        </div>

    </div>
  )
}


