import React from 'react'
import Mainbanner from '../Components/Mainbanner'
import { Route, Routes } from 'react-router-dom'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'
import Bottombanner from '../Components/Bottombanner'
import NewsLetter from '../Components/NewsLetter'

export default function Home() {
  return ( 
    <div className='mt-10 mb-10' >
        <Mainbanner/>
        <Categories/>
        <BestSeller/>
        <Bottombanner/>
        <NewsLetter/>
       
    </div>
  )
}
