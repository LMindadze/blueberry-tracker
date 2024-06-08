// contracts/ProductContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
    struct Product {
        uint id;
        string name;
        string description;
        string origin;
        string productionDate;
        string methods;
        address farmer;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    function createProduct(
        string memory _name,
        string memory _description,
        string memory _origin,
        string memory _productionDate,
        string memory _methods
    ) public {
        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _description,
            _origin,
            _productionDate,
            _methods,
            msg.sender
        );
    }

    function getProduct(uint _id) public view returns (Product memory) {
        return products[_id];
    }
}
