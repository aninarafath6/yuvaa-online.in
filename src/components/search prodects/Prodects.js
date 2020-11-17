import React, { useEffect, useState,useRef } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './p.css';
function Prodects(props) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggin, setIsLoggin] = useState(true);
    const [count, setCount] = useState(2);
    const visbleRef =useRef();
    useEffect(() => {
        visbleRef.current.classList.toggle("visible-search-component");

        const fetchData = async () => {
            setIsLoading(true);
            const res = await axios.get('sPro', { params: { cto: props.data } })
                .catch((err) => {
                    console.log(err);
                });
            setData(res.data)
            setIsLoading(false);

        }
        fetchData();
    }, [props.data])
    let token = localStorage.getItem("token")
    const config = {};
    if (token !== null) {
        config.headers = { authorazation: "Bearer " + token };

    }

    const onAddtoCart = (id) => {
        axios.get("addTocart/" + id, config).then((res) => {
            console.log(res);
            setIsLoggin(res.data.loggin)
            setCount(count + 1)
            props.adedItemToCart(count)


        })

    }

    return (
      <div ref={visbleRef} className="search-component">
            {isLoggin ? (
                <>

                    <ul className="prodects" >
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
                                                        </span>{" "}
                                                        <del className="delPrice">₹{prod.canPrice} </del>
                                                    </div>
                                                    <div className="off">{prod.off}OFF</div>
                                    </Link>

                                                    <div className="addTocartBtn">
                                                        <button onClick={() => onAddtoCart(prod._id)} className="btn addTocart btn-info">Add To Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                </li>
                            );
                        })}

                    </ul>

                </>

            ) : (

                    <>
                        <Redirect to="/login" />

                    </>


                )
            }
        </div>
    );
}

export default Prodects;
{/* <ProdectData  data={props.data}/>          */ }