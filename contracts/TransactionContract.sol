// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductContract.sol";

contract TransactionContract {
    struct Transaction {
        uint256 id;
        uint256 productId;
        address buyer;
        uint256 purchaseTime;
        string shippingStatus;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;
    ProductContract productContract;
    address public owner;

    event ProductPurchased(uint256 transactionId, uint256 productId, address buyer, string shippingStatus);
    event ShippingStatusUpdated(uint256 transactionId, string shippingStatus);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(address _productContractAddress) {
        productContract = ProductContract(_productContractAddress);
        owner = msg.sender;
    }

    function buyProduct(uint256 _productId) public payable {
        require(msg.value > 0, "Payment required to buy product");
        
        transactions[transactionCount] = Transaction(transactionCount, _productId, msg.sender, block.timestamp, "Processing");
        emit ProductPurchased(transactionCount, _productId, msg.sender, "Processing");
        
        transactionCount++;
    }

    function markAsShipped(uint256 _transactionId) public onlyOwner {
        require(_transactionId < transactionCount, "Transaction does not exist");
        transactions[_transactionId].shippingStatus = "Shipped";
        emit ShippingStatusUpdated(_transactionId, "Shipped");
    }

    function getTransaction(uint256 _id) public view returns (Transaction memory) {
        return transactions[_id];
    }

    function getTransactionsByProductId(uint256 _productId) public view returns (Transaction[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < transactionCount; i++) {
            if (transactions[i].productId == _productId) {
                count++;
            }
        }

        Transaction[] memory result = new Transaction[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < transactionCount; i++) {
            if (transactions[i].productId == _productId) {
                result[index] = transactions[i];
                index++;
            }
        }

        return result;
    }
}
