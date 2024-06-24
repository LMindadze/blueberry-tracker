import React from 'react';
import QRCode from 'qrcode.react';

const ProductQRCode = ({ productId }) => {
  return <QRCode value={productId.toString()} />;
};

export default ProductQRCode;
