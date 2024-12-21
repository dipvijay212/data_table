import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, image, title, price, description } = location.state;

  const [updatedImage, setUpdatedImage] = useState(image);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.patch(`http://localhost:3000/product/${id}`, {
        image: updatedImage,
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDescription,
      })
      .then(() => {
        alert('Product successfully updated!');
        navigate('/product'); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={updatedImage}
          onChange={(e) => setUpdatedImage(e.target.value)}
          placeholder="Image URL"
          style={{padding : "10px 40px"}}
        />
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="Title"
          style={{padding : "10px 40px"}}
        />
        <input
          type="text"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
          placeholder="Price"
          style={{padding : "10px 40px"}}
        />
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          placeholder="Description"
          style={{padding : "10px 40px"}}
        />
        <button type="submit" style={{ backgroundColor: '#646cff', color: 'white'}}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
