import React, { useState, useEffect } from 'react';
import { transactionContractInstance } from '../utils/contractUtils';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const transactionCount = await transactionContractInstance.methods.transactionCount().call();
        console.log('Transaction Count:', transactionCount);
        
        let transactionList = [];
        for (let i = 0; i < transactionCount; i++) {
          const transaction = await transactionContractInstance.methods.getTransaction(i).call();
          console.log('Transaction:', transaction);
          transactionList.push(transaction);
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
            Transaction ID: {transaction.id} - Product ID: {transaction.productId} - Buyer: {transaction.buyer} - Purchase Time: {new Date(transaction.purchaseTime * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
