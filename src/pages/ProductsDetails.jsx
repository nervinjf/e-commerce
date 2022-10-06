import { createNextState } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getCart } from '../store/slice/cart.slice';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom'
import CartSideBar from '../Components/CartSideBar';
import { addCartThunk } from '../store/slice/cart.slice';

const ProductsDetails = ({ quantifyCart }) => {

    const { id } = useParams();
    const products = useSelector(state => state.products);
    const quantifys = useSelector(state => state.number)
    const dispatch = useDispatch();
    const productDetails = products.find((product) => product.id === Number(id))
    const relatedProducts = products.filter(product => product.category.id === productDetails.category.id);
    const navigate = useNavigate();
    const [ number, setNumber ] = useState(0);
    const [ quantify, setQuantify ] = useState(1);

    // const addProductCart = (idItems) => {
    //     dispatch(getCart(idItems));
    // }

    useEffect(() => {
        setQuantify(1)
    }, [id])

    const addCart = () => {
        const cart = {
            "id": id,
            "quantity": quantify
        }
        dispatch(addCartThunk(cart));
    }

    return (
        <>
            <div className='container-info-products'>
                <span onClick={() => navigate("/")}>Home</span>
                <i class="fa-solid fa-circle"></i>
                <p>{productDetails?.title}</p>
            </div>
            <section className='container-description'>
                <div className='container-description-carrusel'>
                    <div className='container-description-carrusel-box1'>
                        <i class="fa-solid fa-chevron-left" onClick={() => setNumber(number - 1)} style={number === 0 ? { visibility: "hidden" } : { visibility: "visible" }}></i>
                        <div className='container-img-carrusel'>
                            <img src={productDetails?.productImgs[number]} alt="" width={"250px"} /* height={"370px"} */ />
                        </div>

                        <i class="fa-solid fa-chevron-right" onClick={() => setNumber(number + 1)} style={number === 2 ? { visibility: "hidden" } : { visibility: "visible" }}></i>
                    </div>
                    <div className='container-description-carrusel-box2'>
                        <img src={productDetails?.productImgs[0]} alt="" width={"15%"} height={"60%"} onClick={() => setNumber(0)} />
                        <img src={productDetails?.productImgs[1]} alt="" width={"15%"} height={"60%"} onClick={() => setNumber(1)} />
                        <img src={productDetails?.productImgs[2]} alt="" width={"15%"} height={"60%"} onClick={() => setNumber(2)} />
                    </div>
                </div>
                <div className='container-description-details'>
                    <div className='container-description-details-title'>
                        <p>{productDetails?.title}</p>
                    </div>
                    <div className='container-description-details-description'>
                        <p>{productDetails?.description}</p>
                    </div>
                    <div className='container-price-Quantify-all'>
                        <div className='container-price'>
                            <span>Price</span>
                            <p>$ {productDetails?.price}</p>
                        </div>
                        <div className='container-price-Quantify'>
                            <span>Quantity</span>
                            <div className='container-Quantify'>
                            <button onClick={()  => setQuantify(quantify-1)} disabled={quantify === 1}><i class="fa-solid fa-minus"></i></button>
                            <p>{quantify}</p>
                            <button onClick={()  => setQuantify(quantify+1)} disabled={quantify === 20}><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className='container-description-details-addcard'>
                       <button onClick={addCart}>Add to cart <i class="fa-solid fa-cart-shopping"></i></button> 
                    </div>
                    
                </div>

            </section>
            <section className='container-description2'>
                <div className='container-similar-items'>
                    <p>Discover similar items</p>
                </div>
                <div className="container-grid">
                    {
                        relatedProducts.map(related => (
                            <div key={related?.id} className="container-card" onClick={() => navigate(`/product/${related.id}`)}>
                                    <div className='container-img'>
                                            <img className='container-img1' src={related?.productImgs[0]} alt="" width={"10%"}/>
                                            <img className='container-img2' src={related?.productImgs[1]} alt="" width={"10%"} />
                                </div>
                                <div className='container-card-title'>
                                    <p>{related?.title}</p>
                                </div>
                                <div className='container-card-price-car'>
                                    <div className='container-price'>
                                        <span>Price:</span>
                                        <p>${related?.price}</p>
                                    </div>
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </div>
                                
                                
                            </div>
                        ))
                    }
                </div>    
            </section>
            <CartSideBar quantify={quantify}/>
        </>
    );
};

export default ProductsDetails;