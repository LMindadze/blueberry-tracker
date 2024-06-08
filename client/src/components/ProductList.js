// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the blockchain or a mock API
    setProducts([
      { id: 1, name: 'Blueberry Batch 1', description: 'Fresh blueberries from farm A' },
      { id: 2, name: 'Blueberry Batch 2', description: 'Organic blueberries from farm B' },
    ]);
  }, []);

  return (
    <div className="product-list">
      <h1>Available Blueberries</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
