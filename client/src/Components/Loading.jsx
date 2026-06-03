import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Loading = () => {
   
  const { axios, user, setcarditem, fetchUser } = useAppContext()
  const navigate = useNavigate()
  const effectRan = useRef(false)
  const { search  } = useLocation()
  const query = new URLSearchParams(search)
  const nextUrl = query.get('next')

  useEffect(() => {
    if (!nextUrl || effectRan.current) return
    effectRan.current = true

    const clearCart = async () => {
      setcarditem({})
      if (user) {
        try {
          await axios.post('/api/cart/update', { cardItems: {} })
          await fetchUser()
        } catch (error) {
          console.error(error)
        }
      }
    }

    clearCart()
    const timer = setTimeout(() => {
      navigate(`/${nextUrl}`, { replace: true })
    }, 5000)

    return () => clearTimeout(timer)
  }, [nextUrl, user, axios, fetchUser, setcarditem, navigate])

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className=' animate-spin rounded-full h-24 w-24 border-4
         border-gray-300  border-t-primary' ></div>
    </div>
  )
}

export default Loading