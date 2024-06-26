import React, { useState, useEffect } from "react";
import { transactionContractInstance } from "../utils/contractUtils";
import QRCode from "qrcode.react";
import "./TransactionList.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const transactionCount = await transactionContractInstance.methods
          .transactionCount()
          .call();
        let transactionList = [];
        for (let i = 0; i < Number(transactionCount); i++) {
          const transaction = await transactionContractInstance.methods
            .getTransaction(i)
            .call();
          transactionList.push({
            id: Number(transaction.id),
            productId: Number(transaction.productId),
            buyer: transaction.buyer,
            purchaseTime: new Date(
              Number(transaction.purchaseTime) * 1000
            ).toLocaleString(),
            shippingStatus: transaction.shippingStatus,
          });
        }
        setTransactions(transactionList);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return (
      <div className="loadingSpinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return <div className="container">No transactions available</div>;
  }

  return (
    <div>
      <h2 className="header">Transaction List</h2>
      <ul className="transactionList">
        {transactions.map((transaction, index) => (
          <li key={index} className="transactionItem">
            <p>
              <strong>Transaction ID:</strong> {transaction.id}
            </p>
            <p>
              <strong>Product ID:</strong> {transaction.productId}
            </p>
            <p>
              <strong>Buyer:</strong> {transaction.buyer}
            </p>
            <p>
              <strong>Purchase Time:</strong> {transaction.purchaseTime}
            </p>
            <p>
              <strong>Shipping Status:</strong> {transaction.shippingStatus}
            </p>
            <QRCode
              value={`${window.location.origin}/transaction/${transaction.id}`}
              className="qrCode"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
