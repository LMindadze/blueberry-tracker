import React, { useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
 
function Login({setIsCustomer}) {

  const navigate = useNavigate();

  const handleCustomerClick = () => {
    setIsCustomer(true);
    navigate("/products");
  };

  const handleFarmerClick = () => {
    setIsCustomer(false);
    navigate("/products");
  };

  return (
    <div id = "Login">
    <div id = "LoginAs">Login As:</div>
    <button id="Customer" onClick={handleCustomerClick}>Customer</button>
    <button id="Farmer" onClick={handleFarmerClick}>Farmer</button>
    </div>       
  );

}
 
export default Login;