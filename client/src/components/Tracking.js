import React, { useState } from 'react';
import { productContractInstance } from '../utils/contractUtils';

const Tracking = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleTrack = async () => {
    const product = await productContractInstance.methods.getProduct(productId).call();
    setProduct(product);
  };

  return (
    <div>
      <h2>Track Product</h2>
      <input
        type="text"
        value={productId}
        onChange={handleChange}
        placeholder="Enter Product ID"
      />
      <button onClick={handleTrack}>Track</button>

      {product && (
        <div>
          <h3>Product Details</h3>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Origin: {product.origin}</p>
          <p>Production Date: {product.productionDate}</p>
          <p>Farming Practices: {product.farmingPractices}</p>
        </div>
      )}
    </div>
  );
};

export default Tracking;
