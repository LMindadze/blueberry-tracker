const assert = require('assert');
const ProductContract = artifacts.require("ProductContract");
const TransactionContract = artifacts.require("TransactionContract");

describe("ProductContract", function () {
  it("should create a product", async function () {
    const productContract = await ProductContract.deployed();
    await productContract.createProduct(
      "Blueberry Batch 1",
      "Fresh blueberries from farm A",
      "Farm A",
      "2024-06-01",
      "Organic farming practices"
    );

    const product = await productContract.getProduct(1);
    assert.strictEqual(product.name, "Blueberry Batch 1");
  });
});

describe("TransactionContract", function () {
  it("should purchase a product", async function () {
    const productContract = await ProductContract.deployed();
    await productContract.createProduct(
      "Blueberry Batch 1",
      "Fresh blueberries from farm A",
      "Farm A",
      "2024-06-01",
      "Organic farming practices"
    );

    const transactionContract = await TransactionContract.deployed();
    await transactionContract.purchaseProduct(1, { value: web3.utils.toWei('1', 'ether') });

    const transaction = await transactionContract.getTransaction(1);
    assert.strictEqual(Number(transaction.productId), 1); // Convert productId to number
  });
});
