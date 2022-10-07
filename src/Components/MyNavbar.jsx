import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import CartSideBar from './CartSideBar';
import { useState } from 'react';


const MyNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu);
  const itemCart = useSelector(state => state.cart)
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(itemCart)

  return (
    <>
      <nav>
        <p onClick={() => navigate(`/`)}>e-commerce</p>
        <div className='container-i-nav'>
          <i className="fa-solid fa-user" to="/login" onClick={() => navigate(`/login`)}></i>
          <i className="fa-solid fa-box-archive" onClick={() => navigate(`/purchases`)}></i>
          <i className="fa-solid fa-cart-shopping" onClick={handleShow}>
            <div className='testtt'>
              <p>{itemCart.length}</p>
            </div>
            
          </i>

        </div>
      </nav>
      <CartSideBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default MyNavbar;