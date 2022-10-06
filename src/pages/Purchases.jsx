import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases)
    const navigate = useNavigate()
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div className='container-purchases'>
            <div className='container-info-productsp'>
                <span onClick={() => navigate("/")}>Home</span>
                <i class="fa-solid fa-circle"></i>
                <p><b>Purchases</b></p>
            </div>
            <p>My purchases</p>
            <div className='box-item-purchases'>

                {
                    purchases.map(purchase => (
                        <div className='container-date-purchases' key={purchase.id}>
                            <h2>{new Date(`${purchase.createdAt}`).toLocaleDateString(undefined, options)}</h2>
                            <div>
                                {
                                    purchase.cart.products.map(purchaseItem => (
                                        <div className='container-item-purchases' key={purchaseItem.id} onClick={() => navigate(`/product/${purchaseItem.id}`)}>
                                            <h3>{purchaseItem.title}</h3>
                                            <p>{purchaseItem?.productsInCart?.quantity}</p>
                                            <span>${purchaseItem.price}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Purchases;