import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function PaymentSuccess() {

    // to get the cart item and move it to the orders

  return (
   <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
      <div className="card" >
  
  <div className="card-body">
  <FontAwesomeIcon className='pay-icon' icon={faCircleCheck} />  <h6 style={{display:"inline-block",marginLeft:"20px"}}>Payment successful... </h6>
  </div>
</div>
      </div>
    </div>
   </div>
  )
}

export default PaymentSuccess;