import Web3 from 'web3';

let web3;

if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
  web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error("User denied account access");
  }
} else if (typeof window.web3 !== 'undefined') {
  // Legacy dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Non-dapp browsers...
  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
  web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // Ganache fallback
}

export default web3;
