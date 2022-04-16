import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
//import Axios from 'axios';
//import Header from "./components/Header";
import Home from "./components/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
//import Footer from './components/Footer';
import AddItem from './pages/AddItem';
import ShoppingCart from './pages/ShoppingCart';
import Product from "./components/Product";
import Dashboard from "./pages/Dashboard";


function App() {

  const [token, setToken] = useState();

  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');

  useEffect ( () => {
      if(localStorage.getItem("userInfo") != null){
        setLoggedIn(true);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setIsAdmin(userInfo.isAdmin);
      }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="row">
                <div>
                  <a className="brand" href="/">UthrifTSA</a>
                </div>
                <div>
                { loggedIn ?
                  <div>
                    {isAdmin ? 
                    <Link to="/admin/additem">Add Item </Link>
                    : 
                      <div>
                        <Link to="/cart">Shopping Cart</Link>
                        <Link to="/dashboard">Account Dashboard</Link>
                      </div>
                    }
                    <Link to="/login" onClick={logout}>Log Out</Link>
                  </div>
                  :
                  <div>
                  <Link to="/signup">Sign Up </Link>
                  <Link to="/login">Log In </Link>
                  </div>
                }
                </div>
            </header>
      <div className="form">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/admin/additem" element={<AddItem />}/>
          <Route path="/cart" element={<ShoppingCart />}/>
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
      <footer className="row center">ALL RIGHTS RESERVED (LMAAO)</footer>
    </div>
  );
}

export default App;