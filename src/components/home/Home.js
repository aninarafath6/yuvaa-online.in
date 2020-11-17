import React, { useState, useEffect } from "react";
import Slider from '../topSlider/Slider'
import { Link, Redirect } from "react-router-dom";
import "./home.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Spinner } from 'react-bootstrap'

// import p1 from './images/1.png';
import axios from "axios";

function Home(props) {


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [isLoggin, setIsLoggin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(true);
      const res = await axios.get("home").catch(function (error) {
        // handle error
        console.log(error);
      });
      if (res.data !== undefined) {
        setData(res.data.data);
      }
      setIsLoading(false);
    };
    fetchData();





  }, []);
  let token = localStorage.getItem("token")
  const config = {};
  if (token !== null) {
    config.headers = { authorazation: "Bearer " + token };

  }
  const onAddToCart = id => {
    axios.get("addTocart/" + id, config).then((res) => {
      console.log(res);
      setIsLoggin(res.data.loggin)
      setCount(count + 1*2)
      props.data(count)


    })

  }

  return (
    <>
      <Slider />
      {
        isLoggin ? (
          <>
            {isLoading || data === undefined ? (
              <>
                <div className="center">
                  <Spinner animation="border" variant="info" />

                </div>

              </>
            ) : (


                <ul className="prodects" >
                  <div className="catName">
                    <h3 className="ctry">TOP OFFER PRODECTS</h3>
                    <p className="ctryDisc">Inspired by Your Interes</p>
                  </div>
                  {data.map((prod, ky) => {
                    return (
                      <li className="li  " key={ky}>
                        <div className="prodect">
                          <div className="img-wrapper">
                            <Link to={'/prodectDeitials' + prod._id}>

                              <img className=" prodImginHome" src={"http://localhost:3001/prodects-images/" + prod._id + "_0.jpg"} alt="" />
                            </Link>
                          </div>
                          <div className="detials-wrapper">
                            <div className="">
                              <Link to={'/prodectDeitials' + prod._id}>
                                <div className="prodect-name">{prod.name}</div>
                                <div classNmae="prodeuctPrice">
                                  <span className="prodect-price">
                                    ₹{prod.offPrice}
                                  </span>
                                  <del className="delPrice">₹{prod.canPrice} </del>
                                </div>
                              </Link>
                              <div className="off">{prod.off}OFF</div>

                              <div className="addTocartBtn">
                                <button onClick={() => onAddToCart(prod._id)} className="btn addTocart btn-info">Add To Cart</button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </li>
                    );
                  })}
                </ul>


              )}
          </>
        ) : (
            <>
              <Redirect to="/login" />


            </>
          )
      }
    </>
  );
}

export default Home;
