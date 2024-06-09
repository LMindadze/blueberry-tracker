// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
    struct Product {
        string name;
        string description;
        string origin;
        string productionDate;
        string farmingPractices;
    }

    struct Review {
        address reviewer;
        uint8 rating;
        string comment;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Review[]) public productReviews;
    uint256 public productCount;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _origin,
        string memory _productionDate,
        string memory _farmingPractices
    ) public {
        products[productCount] = Product(_name, _description, _origin, _productionDate, _farmingPractices);
        productCount++;
    }

    function updateProduct(
        uint256 _id,
        string memory _name,
        string memory _description,
        string memory _origin,
        string memory _productionDate,
        string memory _farmingPractices
    ) public onlyAdmin {
        require(_id < productCount, "Product does not exist");
        products[_id] = Product(_name, _description, _origin, _productionDate, _farmingPractices);
    }

    function deleteProduct(uint256 _id) public onlyAdmin {
        require(_id < productCount, "Product does not exist");
        delete products[_id];
    }

    function getProduct(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }

    function getProducts() public view returns (Product[] memory) {
        Product[] memory productList = new Product[](productCount);
        for (uint256 i = 0; i < productCount; i++) {
            productList[i] = products[i];
        }
        return productList;
    }

    function addReview(uint256 _productId, uint8 _rating, string memory _comment) public {
        require(_productId < productCount, "Product does not exist");
        require(_rating > 0 && _rating <= 5, "Rating must be between 1 and 5");

        productReviews[_productId].push(Review(msg.sender, _rating, _comment));
    }

    function getReviews(uint256 _productId) public view returns (Review[] memory) {
        return productReviews[_productId];
    }
}
