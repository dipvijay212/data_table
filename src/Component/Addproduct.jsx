import axios from 'axios';
import React, { useState } from 'react'

const Addproduct = () => {

  const NewObj = {
    image: "",
    title: "",
    price: "",
    description: "",
    category: ""
    
};

  const [assign ,setassign] = useState(NewObj)
  console.log(assign);
  
 const handlesubmits = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/product',assign)
    .then((res) => setassign(res.data))
    .catch((err) => console.log(err))
 }

 const handlechange = (e) => {
  setassign({ ...assign, [e.target.name]: e.target.value });
  console.log(e.target.value);
  
};



  return (
    <div>
      <h1>Addproduct</h1>

      <form onSubmit={handlesubmits}>
                <input type='text' placeholder='Image' name="image" value={assign.image} onChange={handlechange}   style={{padding : "10px 40px"}}/><br /><br />
                <input type='text' placeholder='Title' name="title"  value={assign.title} onChange={handlechange}  style={{padding : "10px 40px"}} /><br /><br />

                <select name="category"   style={{padding : "10px 58px"}} value={assign.category} onChange={handlechange} >
                    <option value="">Select Category</option>
                    <option value="mens_clothing">Men's Clothing</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="electronics">Electronics</option>
                    <option value="womens_clothing">Women's Clothing</option>
                </select><br /><br />

                <input type='text' placeholder='Price' name="price" value={assign.price} onChange={handlechange}  style={{padding : "10px 40px"}} /><br /><br />
                <input type='text' placeholder='Description' name="description"  value={assign.description} onChange={handlechange} style={{padding : "10px 40px"}} /><br /><br />
                <input type='submit' style={{padding : "8px 20px"}}/><br /><br />
            </form>
    </div>
  )
}

export default Addproduct
