import React, { useState, useEffect } from 'react';
import { productContractInstance } from '../utils/contractUtils';
import web3 from '../web3';

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productCount = await productContractInstance.methods.productCount().call();
        let productList = [];
        for (let i = 0; i < productCount; i++) {
          const product = await productContractInstance.methods.getProduct(i).call();
          productList.push({ ...product, id: i });
        }
        setProducts(productList);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    const accounts = await web3.eth.getAccounts();
    try {
      await productContractInstance.methods.deleteProduct(id).send({ from: accounts[0] });
      alert('Product deleted successfully!');
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. See console for details.');
    }
  };

  if (products.length === 0) return <div>No products available</div>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
