import { Children, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'https://grocery-bakend.vercel.app';

export const AppContext = createContext();

export const AppContextProvider =({children})=>{

   
    const navigate = useNavigate();
    const [user, setuser] = useState(null)
    const [isSeller, setisSeller] = useState(true)
    const [showuserlogin, setshowuserlogin] = useState(false)
    
    const [carditem, setcarditem] = useState({})
    const [searchQuery, setsearchQuery] = useState({})
   
    const [products, setproducts] = useState([])
   
    const currency =import.meta.env.VITE_CURRENCY;

    
      /////fetch seller status 
      const fetchSeller = async()=>{
        try {
           
         const {data} = await axios.get('/api/seller/is-auth');
            if(data.success){
                setisSeller(true)
            }else{
                setisSeller(false)
            }
        } catch (error) {
            setisSeller(false)
        }
      }
       
     /// fetch User auth status , User data and cart items 
     const fetchUser = async ()=> {
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setuser(data.user)
              
                // Access 'cardItems' from the user object returned by DB
            setcarditem(data.user.cardItems || {});
            }
        } catch (error) {
            setuser(null)

        }
     }



     ////fetch All product //////////
     const fetchProducts = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setproducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
     }    
    ////////Add Product to the cart////////
    const addtocart =(itemID)=>{
    
        // Correctly initialize cardData from the previous state
        let cardData = carditem? structuredClone(carditem) : {};


        if(cardData[itemID]){
            cardData[itemID] += 1;
        }
        else{
             cardData[itemID] = 1;
        } 
        setcarditem(cardData);
    
        toast.success("Added to Cart");
       
          
    }
    /////update Items from card 
     const  updatetocart= (itemID,Quantity)=>{
          let cardData = carditem? structuredClone(carditem) :{} ;
          cardData[itemID]=Quantity;
          setcarditem(cardData);
          toast.success("cart Updated");
     }
     /////remove Product from cart///
      const removetocart =(itemID)=>{
        let cardData = carditem ? structuredClone(carditem) : {};
        if(cardData[itemID]){
        cardData[itemID]-=1;
        if(cardData[itemID]===0){
            delete cardData[itemID];
        }
        }
        toast.success("Removed from cart");
        setcarditem(cardData);
      }
      /////Calculate total card items//////////////////////
      const getCarditems = ()=>{
        let totalCount = 0 ;
        for(const item in carditem){
            totalCount += carditem[item];
        }
      return totalCount;
      }

      ////get carttotal amount ///////
      const getCartAmount =()=>{
        let totalAmount = 0;
        for (const item in carditem){
            let itemInfo = products.find((product)=>product._id === item);
            if(carditem[item]>0){
                totalAmount += itemInfo.offerPrice * carditem[item]
            }
        }
        return Math.floor(totalAmount*100)/100;
         }


         useEffect(()=>{
            fetchSeller()
            fetchProducts()
            fetchUser();
         },[])
          
         ///update data base cart items

            useEffect(()=>{
              const updateCart = async () => {
                try {
                    const {data}=await axios.post('/api/cart/update',{cardItems:carditem} )

                    console.log("Server Response:", data);
                    if(!data.success){
                        toast.error(data.message)
                    }
                } catch (error) {
                           toast.error(error.message)
                } 
              }
              if(user){
                updateCart()
              }
            },[carditem])

  
    const value={
        navigate,
        user,setuser,
        isSeller,setisSeller,
         setshowuserlogin, showuserlogin,
         carditem,setcarditem,
         products,currency,
         addtocart,updatetocart,removetocart,searchQuery,
         setsearchQuery,getCartAmount,getCarditems,
         axios, fetchProducts, fetchUser
          };
return <AppContext.Provider value={value} >
    {children}
</AppContext.Provider>
}

export const useAppContext= ()=>{
return useContext(AppContext)
}