import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [farmingPractices, setFarmingPractices] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      origin,
      productionDate,
      farmingPractices
    };

    onAddProduct(newProduct);

    // Reset the form
    setName('');
    setDescription('');
    setOrigin('');
    setProductionDate('');
    setFarmingPractices('');

    // Navigate back to the main page
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Origin:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Production Date:</label>
        <input
          type="date"
          value={productionDate}
          onChange={(e) => setProductionDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Farming Practices:</label>
        <input
          type="text"
          value={farmingPractices}
          onChange={(e) => setFarmingPractices(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;