import web3 from '../web3';
import ProductContract from '../contracts/ProductContract.json';
import TransactionContract from '../contracts/TransactionContract.json';

const productContractAddress = '0xa6350bFA167BD96d64a119BD6e5A54E9fAe1AD14';
const transactionContractAddress = '0x4C7C63F9338627f859DaE015390173285A585f78';

const productContractInstance = new web3.eth.Contract(
  ProductContract.abi,  // This is the ABI
  productContractAddress
);

const transactionContractInstance = new web3.eth.Contract(
  TransactionContract.abi,  // This is the ABI
  transactionContractAddress
);

export { productContractInstance, transactionContractInstance };
