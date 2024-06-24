import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { validateProduct } from '../utils/contractUtils';

const QRCodeScanner = () => {
  const [productId, setProductId] = useState(null);
  const [isValid, setIsValid] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setProductId(data);
      const valid = await validateProduct(data);
      setIsValid(valid);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
      {productId && (
        <div>
          <p>Product ID: {productId}</p>
          <p>{isValid ? 'Product is authentic' : 'Product is not authentic'}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
