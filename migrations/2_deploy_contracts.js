const ProductContract = artifacts.require("ProductContract");
const TransactionContract = artifacts.require("TransactionContract");

module.exports = async function (deployer) {
  await deployer.deploy(ProductContract);
  const productContract = await ProductContract.deployed();
  await deployer.deploy(TransactionContract, productContract.address);
};
