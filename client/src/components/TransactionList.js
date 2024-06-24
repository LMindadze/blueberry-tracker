import React, { useState, useEffect } from 'react';
import { transactionContractInstance } from '../utils/contractUtils';
import QRCode from 'qrcode.react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const transactionCount = await transactionContractInstance.methods.transactionCount().call();
        let transactionList = [];
        for (let i = 0; i < Number(transactionCount); i++) {
          const transaction = await transactionContractInstance.methods.getTransaction(i).call();
          transactionList.push({
            id: Number(transaction.id),
            productId: Number(transaction.productId),
            buyer: transaction.buyer,
            purchaseTime: new Date(Number(transaction.purchaseTime) * 1000).toLocaleString(),
            shippingStatus: transaction.shippingStatus,
          });
        }
        setTransactions(transactionList);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };

    loadTransactions();
  }, []);

  if (transactions.length === 0) return <div>No transactions available</div>;

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Product ID: {transaction.productId}</p>
            <p>Buyer: {transaction.buyer}</p>
            <p>Purchase Time: {transaction.purchaseTime}</p>
            <p>Shipping Status: {transaction.shippingStatus}</p>
            <QRCode value={`${window.location.origin}/transaction/${transaction.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
