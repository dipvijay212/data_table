import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router'

const Description = () => {
  const param = useParams()  
 const [store,setstore] = useState({})

useEffect(() => {
  axios.get(`http://localhost:3000/products/${param.id}`)
    .then((res) => setstore(res.data))
    .catch((err) => console.log(err));
}, [param.id]);
 

  return (
    <div>
      <h1>Description </h1>
      <div
            className="card"
            key={store.id}
            style={{
              border: '2px solid black',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <img
              className="card-image"
              src={store.image}
              alt={store.title}
              height={250}
              width={250}
            />
            <h2>{store.id}</h2>
            <div className="card-content">
              <h2 className="card-title">{store.title}</h2>
              <p className="card-description">{store.description}</p>
              <h3 className="card-category">{store.category}</h3>
              <h4 className="card-price">${store.price}</h4>
            </div>
          </div>
      </div>

    
  )
}

export default Description
