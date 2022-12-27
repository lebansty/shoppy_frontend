import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  let navigate =useNavigate()
  let formik =useFormik(({
    initialValues:{
emailId:'',
password:''
    },
    validate:(values)=>{
let errors={}

return errors
    },
    onSubmit:async(values,{resetForm})=>{
try {
  let loginData = await axios.post("http://localhost:3001/login",values)
console.log(loginData)
let appToken=loginData.data.token;
let userId =loginData.data.userId;
if(appToken && userId){
  window.localStorage.setItem("app-token",appToken);
  window.localStorage.setItem("userid",userId)
  window.localStorage.setItem("adminAccess",loginData.data.admin)
  navigate('/')
}
resetForm({values:''})
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
    <h5 className="card-title">Login</h5>
    <form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="emailId" value={formik.values.emailId} onChange={formik.handleChange} className="form-control loginInput" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} className="form-control loginInput" id="exampleInputPassword2" required/>
    <Link to={"/signup"} style={{float:"right"}}>Signup</Link>
  </div>

  <button type="submit" className="btn mt-5 loginBtn">Submit</button>
</form>
  </div>
</div>
        </div>
    </div>
   </div>


   </>
  )
}

export default Login