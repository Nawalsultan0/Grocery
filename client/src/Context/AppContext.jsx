import { Children, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider =({children})=>{

   
    const navigate = useNavigate();
    const [user, setuser] = useState(false)
    const [isSeller, setisSeller] = useState(false)
    const [showuserlogin, setshowuserlogin] = useState(false)
    
    const [carditem, setcarditem] = useState({})
    const [searchQuery, setsearchQuery] = useState({})
   
    const [products, setproducts] = useState([])
   
    const currency =import.meta.env.VITE_CURRENCY;

    const fetchProducts = async ()=>{
        setproducts(dummyProducts)
    }  
     ////fetch All product //////////
    useEffect(() => {
     fetchProducts();
    }, [])
    
    ////////Add Product to the card///////
    const addtocart =(itemID)=>{
        let cardData = structuredClone(carditem)

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
          let cardData =structuredClone(carditem);
          cardData[itemID]=Quantity;
          setcarditem(cardData);
          toast.success("cart Updated");
     }
     /////remove Product from cart///
      const removetocart =(itemID)=>{
        let cardData = structuredClone(carditem);
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
        let totalCount=0;
        for(const item in carditem){
            totalCount +=carditem[item];
        }
      return totalCount
      }

      ////get carttotal amount ///////
      const getCartAmount =()=>{
        let totalAmount=0;
        for (const item in carditem){
            let itemInfo = products.find((product)=>product._id === item);
            if(carditem[item]>0){
                totalAmount +=itemInfo.offerPrice * carditem[item]
            }
        }
        return Math.floor(totalAmount*100)/100;
         }
  
    const value={
        navigate,
        user,setuser,
        isSeller,setisSeller,
         setshowuserlogin, showuserlogin,
         carditem,setcarditem,
         products,currency,
         addtocart,updatetocart,removetocart,searchQuery,setsearchQuery,getCartAmount,getCarditems
          };
return <AppContext.Provider value={value} >
    {children}
</AppContext.Provider>
}

export const useAppContext= ()=>{
return useContext(AppContext)
}