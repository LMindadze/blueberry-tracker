// src/components/Tracking.js
import React, { useState } from 'react';

const Tracking = () => {
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleQRCodeScan = (data) => {
    // Fetch tracking information from the blockchain using the data from the QR code
    setTrackingInfo({
      origin: 'Farm A',
      productionDate: '2024-06-01',
      methods: 'Organic farming practices',
    });
  };

  return (
    <div className="tracking">
      <h1>Track Your Blueberries</h1>
      <input type="text" placeholder="Scan QR Code" onChange={(e) => handleQRCodeScan(e.target.value)} />
      {trackingInfo && (
        <div className="tracking-info">
          <p>Origin: {trackingInfo.origin}</p>
          <p>Production Date: {trackingInfo.productionDate}</p>
          <p>Methods: {trackingInfo.methods}</p>
        </div>
      )}
    </div>
  );
};

export default Tracking;
