// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from the blockchain or a mock API
    setProduct({ id, name: `Blueberry Batch ${id}`, description: `Description for Blueberry Batch ${id}` });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-arrow">← Return to Homepage</Link>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Link to={`/purchase/${product.id}`}>Purchase</Link>
    </div>
  );
};

export default ProductDetail;
