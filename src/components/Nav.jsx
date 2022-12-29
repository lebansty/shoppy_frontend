import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import UserContext from './userContext'
import axios from 'axios'


function Nav() {

  let context =useContext(UserContext)
  const [admin,setAdmin]=useState(false)
  const [user,setUser] =useState(false)
  let navigate =useNavigate()
let cartLength =context.cart.length
let loadData=async()=>{
try {
  let validation = await axios.get("https://fullstcack-project-4-shoppy-backend.vercel.app/user-identify",{
    headers:{
      "id":window.localStorage.getItem("userid")
    }
  })
  if(validation.data.admin || validation.data.admin.user){
    setAdmin(validation.data.admin)
    setUser(validation.data.admin.user)
  }

 
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
loadData()
},[])
let logOut=()=>{
window.localStorage.removeItem('userid');
window.localStorage.removeItem('app-token');
window.localStorage.removeItem('adminAccess');
navigate("/login")
}
  return (
    <>
      <nav className='banner'>
        <h3 style={{ display: "inline" }}><Link to={'/'}>Sneak</Link></h3><Link to={'/cart-item'} className='cartIcon'><FontAwesomeIcon icon={faShoppingCart} /><div className='cart-count'>{cartLength?cartLength:0}</div></Link><span className='login'>{!admin && !user ?<Link to={"/login"}>Login/Signup</Link>:admin||user?<span onClick={logOut}>Logout </span>:null}</span>{admin?<span className='product_update'><Link to={"/products"}>Update Products</Link></span>:null}
      </nav>
      <Outlet />
    </>
  )
}

export default Nav