import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StripePay from './StripePay'



function Cart() {
 const [addCart,setAddCart] =useState([])

  let loadData=async()=>{
try {
  let cartData =await axios.get('http://localhost:3001/get-cartDet',{
    headers:{
      userid:window.localStorage.getItem('userid')
    }
  })
 if(cartData.data.cartData){
  setAddCart(cartData.data.cartData)
 }
 
  
} catch (error) {
  console.log(error)
}
  }
  useEffect(()=>{
loadData()
  },[])



  let totalAmount=0;
  addCart.map((val)=>{
 totalAmount += parseInt(val.price)
    return totalAmount;
  })

  let removeFromCart =async(id)=>{
    console.log(id)
    console.log(window.localStorage.getItem('userid'))
try {
  let op= await axios.delete(`http://localhost:3001/remove-Cart/${id}`,{
    headers:{
      userid:window.localStorage.getItem('userid'),
      auth:window.localStorage.getItem('app-token')
    }
  })
  loadData()
  console.log(op)
} catch (error) {
  console.log(error)
}
  }
  return (
    <div className="container">
        <div className="row mt-5 justify-content-between">
            <div className="col-md-6 text-center">
              <div className="row">
      {
        addCart ? addCart.map((val,idx)=>{

          return(
            <div key={idx} className="col-md-4 mb-3">
            <div className="card" style={{height:"300px"}}>
<img src={`${val.url}`} className="card-img-top" alt="..."/>
<div className="card-body">
<h5 className="card-title">{val.brand}</h5>
<p className="card-text">Rs: {val.price}</p>
<button onClick={()=>{removeFromCart(val._id)}} className='btn btn-danger'>Remove</button>
</div>

</div>
            </div>
          )
        }):null
      }
              </div>
            </div>
            <div className="col-md-5">
 <div className="row">
  <div className="col-md-10">
  <div className="card text-bg-light mb-3" >
  <div className="card-header">PRICE DETAILS &#40;{addCart.length} items&#41;</div>
  <div className="card-body">
    <h6 className="card-title" style={{display:"inline"}}>Total Amount</h6><span style={{float:"right"}}>{totalAmount}</span>
    
  </div>
  <StripePay cartItem={addCart}/>
</div>

  </div>
 </div>
            </div>
        </div>
    </div>
  )
}

export default Cart