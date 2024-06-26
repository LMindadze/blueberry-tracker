import web3 from '../web3';
import ProductContract from '../contracts/ProductContract.json';
import TransactionContract from '../contracts/TransactionContract.json';

const productContractAddress = '0xAd22c43255049a15f36ADC443E0ab90f2a2c3D82';
const transactionContractAddress = '0x7371B4099BafB478c0264B8c265307C6597b5279';

const productContractInstance = new web3.eth.Contract(
  ProductContract.abi,  // This is the ABI
  productContractAddress
);

const transactionContractInstance = new web3.eth.Contract(
  TransactionContract.abi,  // This is the ABI
  transactionContractAddress
);

export { productContractInstance, transactionContractInstance };
