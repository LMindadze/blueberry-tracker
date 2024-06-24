import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { transactionContractInstance } from '../utils/contractUtils';

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const transaction = await transactionContractInstance.methods.getTransaction(id).call();
        setTransaction({
          id: Number(transaction.id),
          productId: Number(transaction.productId),
          buyer: transaction.buyer,
          purchaseTime: new Date(Number(transaction.purchaseTime) * 1000).toLocaleString(),
          shippingStatus: transaction.shippingStatus
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading transaction:', error);
        setLoading(false);
      }
    };

    loadTransaction();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!transaction) return <div>No transaction found</div>;

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Transaction ID: {transaction.id}</p>
      <p>Product ID: {transaction.productId}</p>
      <p>Buyer: {transaction.buyer}</p>
      <p>Purchase Time: {transaction.purchaseTime}</p>
      <p>Shipping Status: {transaction.shippingStatus}</p>
    </div>
  );
};

export default TransactionDetail;