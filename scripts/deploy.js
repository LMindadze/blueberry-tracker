async function main() {
    const ProductContract = await ethers.getContractFactory("ProductContract");
    const productContract = await ProductContract.deploy();
    await productContract.deployed();
    console.log("ProductContract deployed to:", productContract.address);
  
    const TransactionContract = await ethers.getContractFactory("TransactionContract");
    const transactionContract = await TransactionContract.deploy(productContract.address);
    await transactionContract.deployed();
    console.log("TransactionContract deployed to:", transactionContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  