// contracts/TransactionContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductContract.sol";

contract TransactionContract {
    struct Transaction {
        uint id;
        uint productId;
        address buyer;
        uint purchaseTime;
    }

    uint public transactionCount = 0;
    mapping(uint => Transaction) public transactions;

    ProductContract productContract;

    constructor(address _productContractAddress) {
        productContract = ProductContract(_productContractAddress);
    }

    function purchaseProduct(uint _productId) public payable {
        ProductContract.Product memory product = productContract.getProduct(_productId);
        require(product.id != 0, "Product does not exist");

        transactionCount++;
        transactions[transactionCount] = Transaction(
            transactionCount,
            _productId,
            msg.sender,
            block.timestamp
        );
    }

    function getTransaction(uint _id) public view returns (Transaction memory) {
        return transactions[_id];
    }
}
