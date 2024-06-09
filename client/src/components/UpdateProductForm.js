import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productContractInstance } from '../utils/contractUtils';
import web3 from '../web3';

const UpdateProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [farmingPractices, setFarmingPractices] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      const product = await productContractInstance.methods.getProduct(id).call();
      setProduct(product);
      setName(product.name);
      setDescription(product.description);
      setOrigin(product.origin);
      setProductionDate(product.productionDate);
      setFarmingPractices(product.farmingPractices);
    };

    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    try {
      await productContractInstance.methods
        .updateProduct(id, name, description, origin, productionDate, farmingPractices)
        .send({ from: accounts[0] });

      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. See console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Origin:</label>
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
      </div>
      <div>
        <label>Production Date:</label>
        <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} required />
      </div>
      <div>
        <label>Farming Practices:</label>
        <input type="text" value={farmingPractices} onChange={(e) => setFarmingPractices(e.target.value)} required />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProductForm;
