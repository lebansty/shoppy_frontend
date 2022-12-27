import React from 'react'

function Card({pics,handleCart}) {
  
 

  return (
   <>
   <div className="col-sm-6 col-md-4 col-lg-3">
   <div className="card ProductCard text-center" >
  <img src={`${pics.url}`} style={{objectFit:"cover",height:"25vh"}} className="card-img-top img-fluid" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{pics.brand}</h5>
    <p className="text-muted">{pics.description}</p>
    <p className="card-text">Rs.{pics.price}</p>
    <button  className="btn btn-primary" onClick={()=>{handleCart(pics)}}  style={{backgroundColor:"cadetblue",border:"none"}}>Add to cart</button>
  </div>
</div>
   </div>

</>
  )
}

export default Card