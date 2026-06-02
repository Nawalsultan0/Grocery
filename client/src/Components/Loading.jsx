import React from 'react'
import { useAppContext } from '../Context/Appcontext'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Loading = () => {
   
  const {navigate, axios, user, setcarditem, fetchUser} = useAppContext()
  let { search  } =useLocation()
  const query = new URLSearchParams(search)
  const nextUrl = query.get('next');


  useEffect(()=>{
   if(nextUrl){
    const clearCart = async () => {
      setcarditem({});
      if(user){
        try {
          await axios.post('/api/cart/update',{cardItems:{}})
          await fetchUser()
        } catch (error) {
          console.error(error)
        }
      }
    }
    clearCart();
    setTimeout(()=>{
      navigate(`/${nextUrl}`)
    },5000)
   }
  },[nextUrl, user, navigate, axios, fetchUser, setcarditem])


  return (
    <div className='flex justify-center items-center h-screen'>
        <div className=' animate-spin rounded-full h-24 w-24 border-4
         border-gray-300  border-t-primary' ></div>
    </div>
  )
}

export default Loading