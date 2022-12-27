import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from './Card'
import UserContext from './userContext';



function Shop() {
    const navigate=useNavigate()
    const [products,setProducts] =useState([])
  const [pro,setPro] =useState(null);
  let context = useContext(UserContext)
 const inputRef =useRef(null);
 let loadData =async()=>{
try {
    let getProductData = await axios.get("https://fullstcack-project-4-shoppy-backend.vercel.app/product-display")
   
    setProducts(getProductData.data.products)
} catch (error) {
    console.log(error)
}
 }
 useEffect(()=>{
loadData()
 },[])

 let loadCart =async()=>{
    try {
      let cartData =await axios.get('https://fullstcack-project-4-shoppy-backend.vercel.app/get-cartDet',{
        headers:{
          userid:window.localStorage.getItem('userid'),
          auth:window.localStorage.getItem('app-token')
        }
      })
      if(cartData.data.cartData){
        context.setCart(cartData.data.cartData)
      }
    } catch (error) {
      console.log(error)
    }
      }
    useEffect(()=>{
    loadCart()
    },[])
 
 
    let outVal=[]

    let addCart=async(pics)=>{
   let token=window.localStorage.getItem('app-token')
    try {
  if(token){
  let addToCart=  await axios.post('https://fullstcack-project-4-shoppy-backend.vercel.app/addToCart',pics,{
        headers:{
            userid:window.localStorage.getItem('userid'),
            auth:window.localStorage.getItem('app-token')
        }
      })
 
      if(addToCart.data.messege){
        
            alert(`${addToCart.data.messege}`)
          
      }if(!addToCart.data.messege){
        loadCart()
      }
     
  }else{
navigate('/login')
  }
    } catch (error) {
        console.log(error)
    }
    }

  let  searchInput=()=>{
    searchBrand(inputRef.current.value)
    }


    


    let searchBrand=(search)=>{
const lowerVal = search.toLowerCase();


    outVal=products.filter((val,idx)=>{
    
if(search !=="" && search !== null){
    return(
        val.brand.toLowerCase().indexOf(lowerVal) !==-1 || !lowerVal
      )
}else{
    return(
        products
    )

    
}
       
       })
setPro(outVal)
      

    }
   
    

    return (
        <>
           
            <div className="container">
                <div className="row mt-2">
                    <div className="row justify-content-end">
           <div className="col-md-3 mt-3">
           <div className="input-group mb-3">
  <input type="text" className="form-control" ref={inputRef} onKeyUp={searchInput} placeholder="Search for brands" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  </div>
           </div>
                    </div>
                    <div className=" col-sm-12 col-md-12 col-lg-12">
                        <div className="row gy-3 my-3">
                      {
                        pro?pro.map((val,idx)=>{
                            return (
                                <Card key={idx} pics={val} handleCart={addCart}></Card>
                            )
                        }):!pro?products.map((val,idx)=>{
                            return (
                                <Card key={idx} pics={val} handleCart={addCart}></Card>
                            )
                        }): !products?<div className="row justify-content-center mt-5">
<div className="col-md-4 text-center">
    <p>Product not found</p>
</div>
                        </div>:null
                      }
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Shop;