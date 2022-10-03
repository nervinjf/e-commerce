import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { menuCart } from '../store/slice/menuCart.slice';

const MyNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu);
  

  return (
    <>
      <nav>
        <p onClick={() => navigate(`/`)}>e-commerce</p>
        <div className='container-i-nav'>
          <i class="fa-solid fa-user" to="/login" onClick={() => navigate(`/login`)}></i>
          <i class="fa-solid fa-box-archive" onClick={() => navigate(`/purchases`)}></i>
          {/* <div className={`carrt `}> */}
            <i class= "fa-solid fa-cart-shopping" onClick={() => dispatch(menuCart(!menu))}></i>
          {/* </div> */}
          
        </div>
      </nav>
      {/* <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/" as={Link}>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/login" as={Link}>Logins</Nav.Link>
            <Nav.Link to="/purchases" as={Link}>Purchases</Nav.Link>
            <Nav.Link >Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </>
  );
};

export default MyNavbar;