const assert = require('assert');
const ProductContract = artifacts.require("ProductContract");
const TransactionContract = artifacts.require("TransactionContract");

contract("TransactionContract", (accounts) => {
  it("should purchase a product", async () => {
    const productContract = await ProductContract.deployed();
    await productContract.createProduct(
      "Blueberry Batch 1",
      "Fresh blueberries from farm A",
      "Farm A",
      "2024-06-01",
      "Organic farming practices",
      { from: accounts[0] }
    );

    const transactionContract = await TransactionContract.deployed();
    await transactionContract.purchaseProduct(1, { from: accounts[1], value: web3.utils.toWei('1', 'ether') });

    const transaction = await transactionContract.getTransaction(1);
    assert.strictEqual(Number(transaction.productId), 1); // Convert productId to number
  });
});
