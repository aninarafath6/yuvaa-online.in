import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import './hedder.css'


function Header(props) {
  const [sItem, setSitem] = useState("");
  const [user, setUser] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [count, setCount] = useState(10);
  const history = useHistory();
  const toggleRef = useRef();
  const menuRef = useRef();
  useEffect(() => {
    let token = localStorage.getItem("token")
    const config = {};
    if (token !== null) {
      config.headers = { authorazation: "Bearer " + token };

    }
    axios.get('usereHdder', config)
      .then(res => {
        setUser(res.data.user);
        setCartCount(res.data.cartCount)


      })



  }, [count, props.reMountHedder, props.reMountHedderr])

  const onLogut = () => {
    setCount(count + 1*2)
    localStorage.clear('token');
    props.onLogut(count)

  }

  const serched = () => {
    if (sItem !=="") {
      history.push('/Sprodects')
      props.data(sItem);

    }
    else {
      history.push('/')

    }

  }

  const serchItem = (e) => {
    let itm = e.target.value;

    setSitem(itm.toString().toLowerCase());

  }
  const toggle = () => {
    console.log(toggleRef.current);
    toggleRef.current.classList.toggle("open");
    menuRef.current.classList.toggle("visible");

  }
  
  return (
    <div >
      <nav className="navbar">
        <div className="brand-and-toggler">
          <label className="toggler-btn" onClick={toggle}>
            <i className="fas fa-bars" />
          </label>

          <label className="nav-brand"><Link to="/" className="brand-link"> YUVAA-ONLINE.IN</Link> </label>

     
          <label className="crt-icon">
            <span className="cart-count">{cartCount}</span>
            <Link className="brand-link" to="/cart">  <i class="fas fa-shopping-cart"></i></Link>         </label>


        </div>
        <div className="serch-section">
          <input onChange={serchItem} className="search" type="text" />
          <span className="searchIcon"><i onClick={serched} class="fas fa-search"></i></span>

        </div>



      </nav>
      <div ref={toggleRef} className="nav2">
        <div className="" >
          <ul className="nav-menu">
            <li className="nav-link"><Link className="Link" to="/">Phones</Link></li>
            <li className="nav-link"><Link className="Link" to="/">Laptops</Link></li>
            <li className="nav-link"><Link className="Link" to="/">Keybord</Link></li>
            <li className="nav-link"><Link className="Link" to="/">Appalence</Link></li>
            <li className="nav-link"><Link className="Link" to="/">Tools</Link></li>
          </ul>
          <hr className="hr" />
          <div ref={menuRef} className="menu container ">
            <ul className="nav-menu-ul inline">
              {
                user ? (
                  <>
                    <li className='nav-li'>
                      <span className=""><i className="fas fa-user nav-menu-icon" /><Link to="/" className="menu-link">Hello,{user.name}</Link></span>
                    </li>
                    <li className='nav-li'>
                      <span onClick={onLogut} className=""><i className="fas fa-sign-out-alt nav-menu-icon" /><Link to="/" className="menu-link">Logout</Link></span>
                    </li>
                    <li className='nav-li'>
                      <span className=""><i className="fas fa-address-book nav-menu-icon" /><Link className="menu-link">Address Book</Link></span>
                    </li>
                  </>
                ) : (
                    <>
                      <li className='nav-li'>
                        <span className=""><i className="fas fa-user nav-menu-icon" /><Link to="/login" className="menu-link">Hello,Sign in</Link></span>
                      </li>
                      <li className='nav-li'>
                        <span className=""><i className="fas fa-sign-in-alt nav-menu-icon" /><Link to="/login" className="menu-link">Login</Link></span>
                      </li>
                      <li className='nav-li'>
                        <span className=""><i className="fas fa-lock nav-menu-icon" /><Link to="/signup" className="menu-link">Sign up</Link></span>
                      </li>
                    </>
                  )
              }


            </ul>
            <ul className="catogary ">
              <li className="cty-li"> <span className=""><i className="fas fa-shopping-cart nav-menu-icon" /><Link to="/cart" className="menu-link">Your Cart</Link></span></li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-box nav-menu-icon" /></span><Link to="/" className="menu-link">Your Orders</Link></li>

              </li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-parachute-box nav-menu-icon" /><Link to="/" className="menu-link">Deliverd Prodects</Link></span></li>

              </li>

            </ul>
            <ul className="catogary-at-large ">
              <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /><Link to="/cart" className="menu-link">Smart Phone</Link></span></li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /></span><Link to="/" className="menu-link">Electronics</Link></li>

              </li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /><Link className="menu-link">Kitchen Appalence</Link></span></li>

              </li>

            </ul>
            <ul className="catogary-at-large ">
              <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /><Link to="/cart" className="menu-link">Tools</Link></span></li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /></span><Link className="menu-link">Laptops</Link></li>

              </li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /><Link to="/" className="menu-link">Pendrives</Link></span></li>

              </li>

            </ul>
            <ul className="catogary-at-large ">
              <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /><Link to="/cart" className="menu-link">Memmory</Link></span></li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /></span><Link className="menu-link">Mouse</Link></li>

              </li>
              <li className="cty-li">
                <li className="cty-li"> <span className=""><i className="fas fa-arrow-right nav-menu-icon" /><Link className="menu-link">Keybord</Link></span></li>

              </li>

            </ul>

          </div>
        </div>


      </div>

    </div>
  );
}


export default Header;