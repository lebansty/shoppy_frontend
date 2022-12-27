import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  let formik =useFormik(({
    initialValues:{
emailId:'',
password:'',
confirmPass:''
    },
    validate:(values)=>{
let errors={}
if(values.emailId === ''){
  errors.emailId = "Enter your email"
}
if(values.password === '' || values.password.length<5){
  errors.password = "Enter password with more than 5 characters"
}
if(values.confirmPass===''){
  errors.confirmPass ="Re-enter your password"
}
if(values.password !== values.confirmPass){
  errors.confirmPass ="Passwords doesn't match"
}
return errors
    },
    onSubmit:async(values,{resetForm})=>{
try {
delete values.confirmPass
let signUp = await axios.post('http://localhost:3001/signup',values)
alert(`${signUp.data.messege}`)
  resetForm({values:''});
} catch (error) {
  console.log(error)
}
    }
  }))
  return (
    <>
    <div className="container-fluid">
     <div className="row">
         <div className="col-md-5 loginPage">
 
         </div>
         <div className="col-md-7 ">
 <div className="card   cardBody">
     <div className='item1'>
 
     </div>
 <div className="card-body item2">
     <h5 className="card-title mb-4">Signup</h5>
     <form onSubmit={formik.handleSubmit} className="formEdit">
   <div className="mb-3">
     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
     <input type="email" name="emailId" value={formik.values.emailId} onChange={formik.handleChange} className="form-control loginInput" id="exampleInputEmail1" aria-describedby="emailHelp"/>
     {
      formik.errors.emailId ? <p style={{color:"red"}}>{formik.errors.emailId}</p>:null
     }
   </div>
   <div className="mb-3">
     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
     <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} className="form-control loginInput" id="exampleInputPassword1"/>
     {
      formik.errors.password ? <p >{formik.errors.password}</p>:null
     }
   </div>
   <div className="mb-3">
     <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
     <input type="password" name="confirmPass" value={formik.values.confirmPass} onChange={formik.handleChange} className="form-control loginInput" id="exampleInputPassword2"/>
     {
      formik.errors.confirmPass ? <p style={{color:"red"}}>{formik.errors.confirmPass}</p>:null
     }
   </div>
   <Link to={"/login"} style={{float:"right"}}>Login</Link>
   <button type="submit" className="btn mt-3 loginBtn">Submit</button>
 </form>
   </div>
 </div>
         </div>
     </div>
    </div>
 
 
    </>
  )
}

export default Signup