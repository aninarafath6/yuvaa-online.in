import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom'
import './prodectDeitials.css'
import p1 from "./Adobe_Post_20201111_2029250.6867267342825958.png"
import axios from 'axios'
import { Redirect } from "react-router-dom";

const ProdectDeitials = (props) => {
    const params = useParams()
    const [isLoding, setLoding] = useState(true)
    const [prodect, setProdect] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [isLoggin, setIsLoggin] = useState(true);
    console.log(params.id);
    const MainImgRef =useRef();
    useEffect(() => {
        const fetchData = async () => {
            setLoding(true)
            axios.get('prodectDetials', { params: { id: params.id } }).then((data) => {
                setProdect(data.data.data)
                setLoding(false)
            })

        }
        fetchData();

    }, [])
    console.log(prodect);
    let token = localStorage.getItem("token")
    const config = {};
    if (token !== null) {
        config.headers = { authorazation: "Bearer " + token };

    }
    const onAddToCart = id => {
        axios.get("addTocart/" + id, config).then((res) => {
            console.log(res);
            setIsLoggin(res.data.loggin)
            setCount(count + 1)
            props.data(count)


        })

    }
    const onChangeImg=(src,index)=>{
        MainImgRef.current.src = "http://localhost:3001/prodects-images/"+src+"_"+index+'.jpg'

    }
    return (
        <div className="deti-wrapper">

          {
              isLoggin?(
                    <div className='card'>
                        <div className="p-Image">
                            <div className="slider">
                                <div className="image-slider">

                                    <div className="main-image"><img ref={MainImgRef} src={"http://localhost:3001/prodects-images/" + prodect._id + "_0.jpg"} className='' /></div>
                                    <div className="sl-images">
                                        <div onClick={()=>onChangeImg(prodect._id,0 )} className="images"><img src={"http://localhost:3001/prodects-images/" + prodect._id + "_0.jpg"} className='' /></div>
                                        <div onClick={()=>onChangeImg(prodect._id,1 )} className="images"><img src={"http://localhost:3001/prodects-images/" + prodect._id + "_1.jpg"} className='' /></div>
                                        <div onClick={() => onChangeImg(prodect._id, 2)} className="images"><img src={"http://localhost:3001/prodects-images/" + prodect._id + "_2.jpg"} className='' /></div>
                                        <div onClick={() => onChangeImg(prodect._id, 3)} className="images"><img src={"http://localhost:3001/prodects-images/" + prodect._id + "_3.jpg"} className='' /></div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="info">
                            <h1 className="prodect-namee">{prodect.name}</h1>
                            <div className="reviews">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star-half-alt" />
                            </div>
                            <div className="pri">
                                <h3 className="prodect-price-dty">₹{prodect.canPrice}</h3>
                                <h3 className="prodect-price-dty"><del>₹{prodect.offPrice}</del></h3>
                            </div>
                            <div className="more-info">
                                <h5 className="discription">Discription</h5>
                            </div>
                            <div className="info-content" >
                                <p className="info-p">
                                    {prodect.disc}
                                </p>
                            </div>

                            <div className="buttons">
                                <button onClick={() => onAddToCart(prodect._id)} className="add-to-acrt-button"><i className="fas fa-shopping-cart" />ADD TO ACRT</button>
                                <button onClick={() => onAddToCart(prodect._id)} className="add-to-acrt-button"><i className="fas fa-buy-alt" />BAY NOW</button>
                            </div>
                        </div>

                    </div>
              ):(
                        <Redirect to="/login" />

              )
          }
        </div>


    );
}

export default ProdectDeitials;
