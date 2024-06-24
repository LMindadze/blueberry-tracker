import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { transactionContractInstance, productContractInstance } from '../utils/contractUtils';

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const transaction = await transactionContractInstance.methods.getTransaction(id).call();
        const product = await productContractInstance.methods.getProduct(transaction.productId).call();
        setTransaction({
          id: Number(transaction.id),
          productId: Number(transaction.productId),
          buyer: transaction.buyer,
          purchaseTime: new Date(Number(transaction.purchaseTime) * 1000).toLocaleString(),
          shippingStatus: transaction.shippingStatus,
        });
        setProduct({
          name: product.name,
          description: product.description,
          origin: product.origin,
          productionDate: new Date(Number(product.productionDate) * 1000).toLocaleString(),
          farmingPractices: product.farmingPractices
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading transaction or product:', error);
        setLoading(false);
      }
    };

    loadTransaction();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!transaction || !product) return <div>No transaction or product found</div>;

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Transaction ID: {transaction.id}</p>
      <p>Product ID: {transaction.productId}</p>
      <p>Buyer: {transaction.buyer}</p>
      <p>Purchase Time: {transaction.purchaseTime}</p>
      <p>Shipping Status: {transaction.shippingStatus}</p>
      <h3>Product Details</h3>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Origin: {product.origin}</p>
      <p>Production Date: {product.productionDate}</p>
      <p>Farming Practices: {product.farmingPractices}</p>
    </div>
  );
};

export default TransactionDetail;
