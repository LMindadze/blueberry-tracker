// src/components/PurchaseForm.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

const PurchaseForm = () => {
  const { id } = useParams();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handlePurchase = () => {
    // Handle the purchase transaction with the blockchain
    setPurchaseCompleted(true);
  };

  return (
    <div className="purchase-form">
      <Link to={`/product/${id}`} className="back-arrow">← Return to Product Details</Link>
      <h1>Purchase Blueberry Batch {id}</h1>
      <button onClick={handlePurchase}>Complete Purchase</button>
      {purchaseCompleted && (
        <div className="qr-code">
          <h2>Purchase Successful!</h2>
          <QRCode value={`https://example.com/tracking/${id}`} />
        </div>
      )}
    </div>
  );
};

export default PurchaseForm;
