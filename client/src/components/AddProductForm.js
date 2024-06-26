import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProductForm.css';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [farmingPractices, setFarmingPractices] = useState('');
  const [quantity, setQuantity] = useState(0); 
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), 
      name,
      description,
      origin,
      productionDate,
      farmingPractices,
      quantity,
      price 
    };

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    localStorage.setItem('products', JSON.stringify([...storedProducts, newProduct]));

    onAddProduct(newProduct);

    // Reset the form
    setName('');
    setDescription('');
    setOrigin('');
    setProductionDate('');
    setFarmingPractices('');
    setQuantity(0); 
    setPrice('');

    navigate('/products');
  };

  return (
    <div className="container">
      <h2 className="header">Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Origin:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Production Date:</label>
          <input
            type="date"
            value={productionDate}
            onChange={(e) => setProductionDate(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Farming Practices:</label>
          <input
            type="text"
            value={farmingPractices}
            onChange={(e) => setFarmingPractices(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="input"
            min="0"
          />
        </div>
        <div className="formGroup">
          <label className="label">Price (in ETH):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="input"
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="button">Add Product</button>
        <button onClick={() => navigate('/products')} className="backButton">Main Page</button>
      </form>
    </div>
  );
};

export default AddProductForm;
