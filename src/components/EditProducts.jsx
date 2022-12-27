import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProducts() {
    const param =useParams()
   const navigate =useNavigate()
    const formik =useFormik(({
        initialValues:{
            brand:"",
            description:"",
            url:"",
            price:"",
            inStock:""
        },
        validate:(values)=>{
let errors={}

if(values.inStock==="" || values.inStock ==="Instock" || !values.inStock){
    errors.inStock ="Select an input"
}

return errors
        },
        onSubmit:async(values)=>{
try {
    let updatedProduct = await axios.put(`https://fullstcack-project-4-shoppy-backend.vercel.app/product-update/${param.proid}`,values,{
      headers:{
        "auth":window.localStorage.getItem('app-token')
      }
    })
    console.log(updatedProduct)
    navigate('/products')
} catch (error) {
    console.log(error)
}
        }
    }))
    let loadData =async()=>{
try {
    let getOp = await axios.get(`https://fullstcack-project-4-shoppy-backend.vercel.app/producton-id/${param.proid}`,{
      headers:{
        "auth":window.localStorage.getItem('app-token')
      }
    })
   let setValue =getOp.data.product
    formik.setValues({
        brand:setValue.brand,
        description:setValue.description,
        url:setValue.url,
        price:setValue.price
       
    })
} catch (error) {
    console.log(error)
}
    }
    useEffect(()=>{
loadData()
    },[])


  return (
   <div className="container">
    <div className="row">
        <div className="col-md-6">
        <div className="card border-info mb-3 mt-5" >
  <h6 className="card-header">Edit product</h6>
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
  
<select className="form-select" id="forStock" name="inStock" value={formik.values.inStock} onChange={formik.handleChange} aria-label="Default select example">
  <option  defaultValue>Instock</option>
  <option value={true}>Yes</option>
  <option value={false}>No</option>
 </select>
 
 <span style={{color:"red",float:"right"}}>{formik.errors.inStock?formik.errors.inStock:null}</span>
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
       
        </div>
    </div>
 
  )
}

export default EditProducts