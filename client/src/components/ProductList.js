import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import web3 from '../web3';
import { transactionContractInstance, productContractInstance } from '../utils/contractUtils';
import QRCode from 'qrcode.react';

const ProductList = ({ products }) => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const handleBuyProduct = async (productId) => {
    const accounts = await web3.eth.getAccounts();

    try {
      const transaction = await transactionContractInstance.methods.buyProduct(productId).send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether'), // Set the appropriate value
        gasPrice: web3.utils.toWei('20', 'gwei') // Set a legacy gas price
      });

      const transactionId = transaction.events.ProductPurchased.returnValues.transactionId;
      const qrValue = `http://localhost:3000/transaction/${transactionId}`;
      const product = await productContractInstance.methods.getProduct(productId).call();

      const newTransaction = {
        id: transactionId,
        productId,
        qrValue,
        buyer: accounts[0],
        productName: product.name,
        productDescription: product.description,
        shippingStatus: 'Processing', // Initial status
      };

      setTransactions([...transactions, newTransaction]);

      alert('Product purchased successfully!');
      navigate('/'); // Navigate back to the main page
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Error purchasing product. See console for details.');
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
            <button onClick={() => handleBuyProduct(product.id)}>Buy</button>
          </li>
        ))}
      </ul>
      <Link to="/add-product">Add a new product</Link>
      <Link to="/transactions">View Transactions</Link>
      <Link to="/admin">Admin Panel</Link>
    </div>
  );
};

export default ProductList;