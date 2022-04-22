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
//import Upload from "./pages/Upload"
import Dashboard from "./pages/Dashboard";
import SearchBar from "./components/SearchBar"; 
import AdminDashboard from "./pages/AdminDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProductScreen from "./pages/ProductScreen";
import { Navbar, Container, Dropdown, DropdownButton } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
const user = <FontAwesomeIcon icon={faUser} />;
const cart = <FontAwesomeIcon icon={faCartShopping} />;


function App() {

  const [token, setToken] = useState();

  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');

  useEffect(() => {
    if (localStorage.getItem("userInfo") != null) {
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
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">UthrifTSA</Navbar.Brand>
        </Container>
        <Container>
          {loggedIn ?
            <div>
              <div>
                {isAdmin ?
                  <div>
                    <Link to="/admindashboard">Admin Dashboard</Link>
                    {/* <Link to="/upload">Image Upload</Link> */}
                    <Link to="/login" onClick={logout}>Log Out</Link>
                  </div>
                  :
                  <div>
                    <div class = "dropdown">
                    <Link to="/cart">{cart}</Link>
                      <button className="dropbtn">{user}</button>
                      <div className="dropdown-content">
                        <Link to="/dashboard">User Dashboard</Link>
                        <Link to="/login" onClick={logout}>Log Out</Link>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
              :

              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              

              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">{user}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/login">Log in</Dropdown.Item>
                  <Dropdown.Item href="/signup">Sign Up </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>

          } 
        </Container>
        </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/additem" element={<AddItem />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/productscreen" element={<ProductScreen />} />
          {/* <Route path="/upload" element={<Upload />} /> */}
          <Route path="/product" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </Container>
      <footer className="row center">ALL RIGHTS RESERVED (LMAAO)</footer>
    </div>
  );
}

export default App;