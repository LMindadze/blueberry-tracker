import web3 from '../web3';
import ProductContract from '../contracts/ProductContract.json';
import TransactionContract from '../contracts/TransactionContract.json';

const productContractAddress = '0xf85A5d67e406a619D302Bb7DcD8057A9aca178B3';
const transactionContractAddress = '0xb9E37a4cbEbf881bb1b63698CC3457983Ad97566';

const productContractInstance = new web3.eth.Contract(
  ProductContract.abi,  // This is the ABI
  productContractAddress
);

const transactionContractInstance = new web3.eth.Contract(
  TransactionContract.abi,  // This is the ABI
  transactionContractAddress
);

export { productContractInstance, transactionContractInstance };
