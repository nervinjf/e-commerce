import { compose } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItems, getCartThunk, purchasesCartThunk } from '../store/slice/cart.slice';


const CartSideBar = ({handleClose, show, quantify}) => {

    const dispatch = useDispatch();
    const itemCart = useSelector(state => state.cart)

    useEffect(() =>{
        dispatch(getCartThunk())
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container-items-box-cart'>
            <div className='container-items-cart'>
              {
                itemCart.map(productc => (
                  <div key={productc.id} >
                    <div className="container-item-cart-trash-category">
                      <p>{productc?.brand}</p>
                      <i className="fa-solid fa-trash" onClick={() => dispatch(deleteItems(productc.id))}></i>
                    </div>
                    <div className='container-item-cart-titel'>
                      <p>{productc?.title}</p>
                    </div>
                    <div className='container-item-cart-quantify'>
                      <p>{productc?.productsInCart?.quantity}</p>
                    </div>
                    <div className='container-item-cart-price'>
                      <span>Total:</span>
                      <p>${productc?.price*productc?.productsInCart?.quantity}</p>
                    </div>
                  </div>

                ))
              }
              <div className='container-total-btn'>
                  <div className='container-total'>
                    <p>Total:</p>
                    <span>${(itemCart?.reduce((amount, item) => Number(item.price) + amount, 0))}</span>
                  </div>
                  <div className='container-btn'>
                    <button onClick={() => dispatch(purchasesCartThunk())}>Checkout</button>
                  </div>
                  
              </div>
            </div>
            
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CartSideBar;