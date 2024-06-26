import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import web3 from '../web3';
import { transactionContractInstance, productContractInstance } from '../utils/contractUtils';
import QRCode from 'qrcode.react';
import styles from './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleBuyProduct = async (productId, purchaseQuantity) => {
    const product = products.find(p => p.id === productId);

    if (purchaseQuantity > product.quantity) {
      alert('You cannot purchase more than the available stock.');
      return;
    }

    const accounts = await web3.eth.getAccounts();

    try {
      const totalPrice = web3.utils.toWei(String(product.price * purchaseQuantity), 'ether');
      const transaction = await transactionContractInstance.methods.buyProduct(productId).send({
        from: accounts[0],
        value: totalPrice, // Set the appropriate value based on quantity and price
        gasPrice: web3.utils.toWei('20', 'gwei') // Set a legacy gas price
      });

      const transactionId = transaction.events.ProductPurchased.returnValues.transactionId;
      const qrValue = `http://localhost:3000/transaction/${transactionId}`;

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

      // Update product quantity
      const updatedProducts = products.map(p => {
        if (p.id === productId) {
          const updatedQuantity = p.quantity - purchaseQuantity;
          if (updatedQuantity > 0) {
            return { ...p, quantity: updatedQuantity };
          } else {
            return null; // Mark product for removal
          }
        }
        return p;
      }).filter(p => p !== null); // Remove products with quantity 0

      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      alert('Product purchased successfully!');
      navigate('/'); // Navigate back to the main page
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Error purchasing product. See console for details.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Product List</h2>
      <div className={styles.links}>
        <Link to="/add-product" className="link">Add a new product</Link>
        <Link to="/transactions" className="link">View Transactions</Link>
      </div>
      <ul className="productList">
        {products.map((product) => (
          <li key={product.id} className="productItem">
            <Link to={`/product/${product.id}`} className="productLink">
              {product.name} (Quantity: {product.quantity}) - Price: {product.price} ETH
            </Link>
            <div>
              <input
                type="number"
                min="1"
                max={product.quantity}
                defaultValue="1"
                id={`quantity-${product.id}`}
                className="quantityInput"
              />
              <button
                onClick={() => {
                  const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value);
                  handleBuyProduct(product.id, quantity);
                }}
                className="buyButton"
              >
                Buy
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
