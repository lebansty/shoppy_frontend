import axios from 'axios'
import React from 'react'

function StripePay({cartItem}) {
console.log(cartItem)
  let handlePayment =async()=>{
if(cartItem.length>0){
  try {
    let stripeCheck= await axios.post('http://localhost:3001/create-checkout-session',cartItem)
   console.log(stripeCheck)
    if(stripeCheck.data.url){
      window.location.href=stripeCheck.data.url
    }
    
    } catch (error) {
      console.log(error)
    }
}
else{
  alert("No item in your cart")
}
  }

  return (
    <button className='btn place-btn' onClick={handlePayment} style={{backgroundColor:"cadetblue",color:"beige",borderRadius:"0"}} >PLACE ORDER </button>
  )
}

export default StripePay