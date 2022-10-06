import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import getConfig from '../utils/getConfig';

const SingUp = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [dontAccount, setDontAccount] = useState(false);
    const [active, setActive] = useState('');
    
    const SingUp = (data) => {
        axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users`, data)
            .then(res => setActive(res.data))
            .catch(error => error.response)
            .finally(() => navigate("/login"));
    }

    return (
        <div className='move-container-form'>
            <div className='container-form-sinUp'>
                <h2>Sign Up</h2>
                <form action="" onSubmit={handleSubmit(SingUp)}>
                    <label htmlFor="email">Email</label>
                    <input type="email"  {...register("email")} />
                    <label htmlFor="First Name">First Name</label>
                    <input type="text"  {...register("firstName")} />
                    <label htmlFor="Last Name">Last Name</label>
                    <input type="text"  {...register("lastName")} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" id="" {...register("password")} />
                    <label htmlFor="Phone">Phone (10 characters)</label>
                    <input type="number" className='input'{...register("phone")} />
                    <button >Entrar</button>
                </form>
                <div className='Already-account'>
                    <p>Already have an account? <span onClick={() => navigate("/login")}> Log in</span> </p>
                </div>
            </div>
        </div>
    );
};

export default SingUp;

