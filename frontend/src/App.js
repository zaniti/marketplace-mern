import 'bootstrap/dist/css/bootstrap.css';

import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import { useState } from 'react';
import Cookie from 'js-cookie'


function App() {

  const userSignin  = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("openn");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")

  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const Disconnect = () => {
    Cookie.remove('userInfo');
    window.location.href = '/';
  }

  return (
    <Router>
      
    
          <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/" >Marketplace youcode</Link>
      </div>
      <div className="header-links">
        <a href="/cart">Cart</a>
        {
          userInfo ? <> <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
          {userInfo.nom}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header> <button onClick={Disconnect}>Disconnect</button> </DropdownItem>
          </DropdownMenu>
        </Dropdown> </>:
        <a href="/signin">Sign In</a>

        }
      </div>
    </header>
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>x</button>
      <ul>
        <li>
          <a href="index.html">test1</a>
        </li>

        <li>
          <a href="index.html">test2</a>
        </li>

      </ul>
    </aside>
    <main className="main">
      <div className="content">

          <Route path="/signin" component={SigninScreen} />       
          <Route path="/register" component={RegisterScreen} />       
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
        
      </div>

    </main>
    <footer className="footer">
      All right reserved. Marketplace youcode ©
    </footer>
  </div>

    </Router>
    
  );
}

export default App;
