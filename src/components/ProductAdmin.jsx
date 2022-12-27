import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ProductAdmin() {
  let navigate=useNavigate()
  const [tableProduct,setTableProduct] =useState([])
  let loadData=async()=>{
try {
  let adminProduct =await axios.get('https://fullstcack-project-4-shoppy-backend.vercel.app/admin-products',{
    headers:{
      adminId:"639c1e79dd7f5c025cc5a2c5",
      "auth":window.localStorage.getItem('app-token')
    }
  })
 console.log(adminProduct)
  setTableProduct(adminProduct.data.adminProducts)
} catch (error) {
 navigate("/login")
}
  }
  useEffect(()=>{
loadData()
  },[])
  let formik = useFormik(({
    initialValues:{
      brand:"",
      description:"",
      url:"",
      price:"",
      inStock:""

    },
    validate:(values)=>{
let errors={};

if(values.inStock ==='' || values.inStock==='Instock'){
  errors.inStock ="Select an input"
}


return errors
    },
    onSubmit:async(values,{resetForm})=>{
try {
   await axios.post('https://fullstcack-project-4-shoppy-backend.vercel.app/product-update',values,{
    headers:{
      adminId:window.localStorage.getItem("userId"),
      auth:window.localStorage.getItem('app-token')
    }
  })
  loadData()
resetForm({values:''})
} catch (error) {
  console.log(error)
}
    }
  }))
  let removeProduct =async(itemId)=>{
try {
if(window.confirm('Are you sure you want to remove this product ?')){
  let res= await axios.delete(`https://fullstcack-project-4-shoppy-backend.vercel.app/remove-product/${itemId}`,{
  headers:{
    auth:window.localStorage.getItem('app-token')
  }
  })
  window.alert(`${res.data.messege}`)
  loadData()
}
} catch (error) {
  console.log(error)
}
  
        }
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-6">
        <div className="card border-info mb-3 mt-5" >
  <h6 className="card-header">Add products</h6>
  <div className="card-body">
  <form className='row  g-3' onSubmit={formik.handleSubmit}>
  <div className="col-md-6   ">
    <label htmlFor="exampleInputBrand" className="form-label">Brand Name</label>
    <input type="text" name="brand" value={formik.values.brand} onChange={formik.handleChange} className="form-control" id="exampleInputBrand" required/>
    
  </div>
  <div className="col-md-6   ">
    <label htmlFor="exampleInputDescrip" className="form-label">Description</label>
    <input type="text" name="description" value={formik.values.description} onChange={formik.handleChange} className="form-control" id="exampleInputDescrip" required/>
    <p className='text-muted m-0'>Give a small description</p>
  </div>
  <div className="col-md-6 mb-3">
    <label htmlFor="exampleInputPUrl" className="form-label">Enter an image URL</label>
    <input type="url" name="url" value={formik.values.url} onChange={formik.handleChange} className="form-control" id="exampleInputUrl" required/>
  </div>
  <div className="col-md-6">
    <label htmlFor='inputPrice' className='form-label'>Price</label>
    <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} className="form-control" id="inputPrice" required  />
  </div>
<div className="col-md-6">
  <label htmlFor='forStock' className='form-label'>Instock</label>
<select className="form-select" id="forStock" name="inStock" value={formik.values.inStock} onChange={formik.handleChange} aria-label="Default select example">
  <option  defaultValue>Instock</option>
  <option value={true}>Yes</option>
  <option value={false}>No</option>
 </select>
 
 <p style={{color:"red"}}>{formik.errors.inStock?formik.errors.inStock:null}</p>
</div>
<div className="row mt-4">
<div className="col-md-2 mb-3">
 <button type="submit" className="btn btn-primary">Submit</button>
 </div>
</div>
</form>
  </div>
</div>
        </div>
        <div className="col-md-6 mt-5">
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Brand</th>
      <th scope="col">Description</th>
      <th scope='col'>Price</th>
      <th scope='col'>Instock</th>
      <th scope='col'>Image</th>
      <th scope='col'>Actions</th>
    </tr>
  </thead>
  <tbody>
  
   {
    tableProduct ? tableProduct.map((val,idx)=>{

      return(
        <tr key={idx}>
        <th scope="row">{idx+1}</th>
        <td>{val.brand}</td>
        <td>{val.description}</td>
        <td>{val.price}</td>
        <td>{val.inStock==="true" ? "Yes":"No"}</td>
       <td>Yes</td>
       <td>
        <Link to={`/edit-products/${val._id}`} className='btn btn-sm btn-warning'>Edit</Link>
        &nbsp;
        <button onClick={()=>{removeProduct(val._id)}} className='btn btn-sm btn-danger'>Delete</button>
        
       </td>
      </tr>
      )
    }):null
   }
  </tbody>
</table>
        </div>
      </div>
    </div>
  )
}

export default ProductAdmin