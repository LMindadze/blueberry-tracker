import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { transactionContractInstance } from '../utils/contractUtils';
import web3 from '../web3';
import { Link } from 'react-router-dom';

const PurchaseForm = () => {
  const { id } = useParams();
  const [account, setAccount] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handlePurchase = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    try {
      await transactionContractInstance.methods.purchaseProduct(id).send({
        from: account,
        value: web3.utils.toWei('1', 'ether'),
      });
      setPurchaseSuccess(true);
    } catch (error) {
      console.error("Purchase failed", error);
      setPurchaseSuccess(false);
    }
  };

  return (
    <div>
      <Link to={`/product/${id}`} className="back-arrow">&#8592; Back to Product</Link>
      <h2>Purchase Product</h2>
      <button onClick={handlePurchase}>Buy Product</button>
      {purchaseSuccess && <p>Purchase successful!</p>}
    </div>
  );
};

export default PurchaseForm;
