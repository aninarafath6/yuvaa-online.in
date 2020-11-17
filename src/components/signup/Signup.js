import React, { useState } from 'react';
import './signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'

function Login(props) {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState();
    const [status, setStatus] = useState(true);
    const [count, setCount] = useState(1);


    const submtHandiler = e => {
        e.preventDefault();
        const data = {
            name: name,
            userName: userName,
            email: email,
            password: password
        }
        axios.post('signup', data)
            .then(res => {
                console.log(res);
                setStatus(res.data.signup);

                if (res.data.token !== undefined) {
                    localStorage.setItem("token", res.data.token);
                    setCount(count + 1)
                    props.data(count)


                    setIsLogged(true)
                } else {
                    setCount(count + 1)
                    props.data(count)
                    setIsLogged(false)

                }
            })
            .catch(err => {
                setCount(count + 1)
                props.data(count)
                console.log(err);
            })



    }
    const onSubmitHandiler = () => {
        console.log(count);
        setCount(count + 1)
        props.data(count)

    }

    return (
        <>
            {
                isLogged === false || isLogged === undefined ? (
                    <>


                        <div className="wrapper bg-light">
                            <div className="login-form-div">
                                <form className="login-form" onSubmit={submtHandiler} method="post">
                                    <h2 className="head-Login">Sign Up</h2>
                                    <input onChange={e => setName(e.target.value)} name="name" className="input-sign-in" id="name" type="text" placeholder="Full Name" /><br />
                                    <input onChange={e => setUserName(e.target.value)} name="useName" className="input-sign-in" id="username" type="text" placeholder="User Name" /><br />
                                    <input onChange={e => setEmail(e.target.value)} name="email" className="input-sign-in" id="email" type="email" placeholder="Email" /><br />
                                    <input onChange={e => setPassword(e.target.value)} name="password" className="input-sign-in" autoComplete="off" id="password" placeholder="Password" type="password" /><br />

                                    <input type="submit" className="btn login-btn btn-success" value="Sign Up" />
                                    <Link to="/login" className="l">you have already accound?</Link>
                                </form>

                            </div>

                        </div>


                    </>
                ) : (
                        <>


                            <Redirect to="/home" />
                        </>
                    )
            }
        </>

    )
}
export default Login;