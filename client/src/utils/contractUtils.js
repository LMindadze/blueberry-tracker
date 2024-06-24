import web3 from '../web3';
import ProductContract from '../contracts/ProductContract.json';
import TransactionContract from '../contracts/TransactionContract.json';

const productContractAddress = '0x697Fd0D1b4bb8f807C10FBbEa7D6Ef3D13B40E0b';
const transactionContractAddress = '0xd25f194ecd4551fc6A54342Bc3A34027e8d3c38c';

const productContractInstance = new web3.eth.Contract(
  ProductContract.abi,  // This is the ABI
  productContractAddress
);

const transactionContractInstance = new web3.eth.Contract(
  TransactionContract.abi,  // This is the ABI
  transactionContractAddress
);

export { productContractInstance, transactionContractInstance };
