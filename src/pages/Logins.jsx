import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Logins = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    const login = (data) => {
        axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
            .then(res => {
                localStorage.setItem("firstname", res.data.data.user.firstName)
                localStorage.setItem("lastname", res.data.data.user.lastName)
                localStorage.setItem("token", res.data.data.token)
                navigate("/")
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert("no autorizado")
                }
                console.log(error.response)
            });
    }

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login")
    }
      

    return (
        <div className='move-container-form'>
            <div className='container-form' style={localStorage.getItem("token") !== "" ? {visibility: "hidden"} : {visibility: "visible"}}>
                <div className='container-form-title'>
                    <h2>Welcome! Enter your email and password to continue</h2>
                </div>
                <div className='container-form-testdata'>
                    <h3>Test data</h3>
                    <p><i className="fa-regular fa-envelope"></i>testnf@test.com</p>
                    <p><i className="fa-solid fa-lock"></i>pass1234</p>
                </div>
                <form action="" onSubmit={handleSubmit(login)}>
                    <label htmlFor="email">Email</label>
                    <input type="email"  {...register("email")} />
                    <label htmlFor="password">Password</label>
                    <input className="input" type="password" name="" id="" {...register("password")} />
                    <button>Entrar</button>
                </form>
                <div className='dont-account'>
                    <p>Don't have an account? <span onClick={() => navigate("/singup")}>Sign up</span> </p>
                </div>
            </div>
            <div className='container-lofin' style={localStorage.getItem("token") !== "" ? {visibility: "visible"} : {visibility: "hidden"}}>
                <i className="fa-solid fa-user"></i>
                <p>{localStorage.getItem("firstname")} {localStorage.getItem("lastname")}</p>
                <span onClick={logout}>Log out</span>
            </div>
        </div>
    );
};

export default Logins;