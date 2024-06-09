import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productContractInstance, transactionContractInstance } from '../utils/contractUtils';
import { Link } from 'react-router-dom';
import web3 from '../web3';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await productContractInstance.methods.getProduct(id).call();
        console.log('Product:', product);
        setProduct(product);

        const transactions = await transactionContractInstance.methods.getTransactionsByProductId(id).call();
        console.log('Transactions:', transactions);
        setTransactions(transactions);

        const reviews = await productContractInstance.methods.getReviews(id).call();
        console.log('Reviews:', reviews);
        setReviews(reviews);
      } catch (error) {
        console.error('Error loading product, transactions, or reviews:', error);
      }
    };

    loadProduct();
  }, [id]);

  const handleBuyProduct = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      await transactionContractInstance.methods.buyProduct(id).send({ from: accounts[0], value: web3.utils.toWei('1', 'ether') });
      alert('Product purchased successfully!');
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Error purchasing product. See console for details.');
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    try {
      await productContractInstance.methods
        .addReview(id, rating, comment)
        .send({ from: accounts[0] });

      alert('Review added successfully!');
      setRating(0);
      setComment('');

      const reviews = await productContractInstance.methods.getReviews(id).call();
      setReviews(reviews);
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Error adding review. See console for details.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/" className="back-arrow">&#8592; Back to Home</Link>
      <h2>Product Detail</h2>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Origin: {product.origin}</p>
      <p>Production Date: {product.productionDate}</p>
      <p>Farming Practices: {product.farmingPractices}</p>
      <button onClick={handleBuyProduct}>Buy Product</button>

      <h3>Transaction History</h3>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              Transaction ID: {transaction.id} - Buyer: {transaction.buyer} - Purchase Time: {new Date(transaction.purchaseTime * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available for this product.</p>
      )}

      <h3>Reviews</h3>
      <form onSubmit={handleAddReview}>
        <div>
          <label>Rating:</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} required />
        </div>
        <div>
          <label>Comment:</label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit">Add Review</button>
      </form>

      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              Rating: {review.rating} - Comment: {review.comment} - Reviewer: {review.reviewer}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  );
};

export default ProductDetail;
