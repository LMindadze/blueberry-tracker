import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import PurchaseForm from './components/PurchaseForm';
import Tracking from './components/Tracking';
import AddProductForm from './components/AddProductForm';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import UpdateProductForm from './components/UpdateProductForm';
import Login from './components/Login';
import CustomerCantAddProduct from './components/CustomerCantAddProduct';
import { productContractInstance } from './utils/contractUtils';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productCount = await productContractInstance.methods.productCount().call();
        let productList = [];
        for (let i = 0; i < productCount; i++) {
          const product = await productContractInstance.methods.getProduct(i).call();
          productList.push({ ...product, id: i });
        }
        setProducts(productList);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: prevProducts.length }]);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
            <Route path="/" element={<Login setIsCustomer={setIsCustomer}/>} />
            <Route path="/products" element={<ProductList products={products} onAddProduct={handleAddProduct} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/purchase/:id" element={<PurchaseForm />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/add-product" element={(isCustomer === false) ? <AddProductForm onAddProduct={handleAddProduct} /> : <CustomerCantAddProduct />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/update-product/:id" element={<UpdateProductForm />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
