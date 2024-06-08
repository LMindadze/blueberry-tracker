const assert = require('assert');
const ProductContract = artifacts.require("ProductContract");

contract("ProductContract", (accounts) => {
  it("should create a product", async () => {
    const productContract = await ProductContract.deployed();
    await productContract.createProduct(
      "Blueberry Batch 1",
      "Fresh blueberries from farm A",
      "Farm A",
      "2024-06-01",
      "Organic farming practices",
      { from: accounts[0] }
    );

    const product = await productContract.getProduct(1);
    assert.strictEqual(product.name, "Blueberry Batch 1");
  });
});
