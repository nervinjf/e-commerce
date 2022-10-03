import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slice/products.slice';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { deleteItems } from '../store/slice/cart.slice';

const Home = () => {

    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu);
    const products = useSelector(state => state.products)
    const productsCart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const [categories, setCtegories] = useState([]);
    const [productFiltered, setProductFilteres] = useState([]);
    const [searchValue, setSearchvalue] = useState([]);
    const [ price, setPrice ] = useState("");
    const [ price1, setPrice1 ] = useState("");

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCtegories(res.data.data.categories))
    }, [])

    const filterCategory = (idCategory) => {
        const filter = products.filter(productfilter => productfilter.category.id === idCategory);
        setProductFilteres(filter)
    }

    useEffect(() => {
        setProductFilteres(products)
    }, [products])

    const vertest = () => {
        setProductFilteres(products)
    }

    const searchProducts = () => {
        const filtered = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));
        setProductFilteres(filtered)
    }

    const searchProductsPrice = () => {
        const filteredPrice = products.filter(product => product.price >= Number(price) && product.price <= Number(price1))
        setProductFilteres(filteredPrice)
    }


    return (
        <div className='flex-home'>
            <div className='category'>
                <button className='btn-deletefilter' onClick={() => vertest()}>borrar filtros</button>
                <div className='filter-category'>
                    <div className='filter-category-title'>
                        <p>Categories</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>

                    {
                        categories.map(category => (
                            <div className='filter-category-item'>
                                <p onClick={() => filterCategory(category.id)} key={category.id}>{category.name}</p>
                            </div>
                        ))

                    }

                </div>
                <div className='filter-price'>
                    <div className='filter-category-price'>
                        <p>Price</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div className='filter-price-input-all'>
                        <div className='filter-price-input filter-price-input1'>
                            <label htmlFor="">From</label>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                        </div>
                        <div className='filter-price-input'>
                            <label htmlFor="">To</label>
                            <input type="number" value={price1} onChange={e => setPrice1(e.target.value)}/>
                        </div>
                        <div className='filter-price-btn'>
                            <button onClick={() => searchProductsPrice()}>Filter price</button>
                        </div>
                        
                    </div>

                </div>

            </div>
            <div className='container-search'>
                <div className='filter-title'>
                    <input type="text" placeholder='What are you looking for?' value={searchValue} onChange={e => setSearchvalue(e.target.value)} />
                    <button onClick={() => searchProducts()}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="container-grid">
                    {
                        productFiltered.map(product => (
                            <div key={product.id} className="container-card" onClick={() => navigate(`/product/${product.id}`)}>
                                <div className='container-img'>
                                    <img src={product.productImgs[0]} alt="" width={"50%"} height={"70%"} />
                                    <div className="img2">
                                        <img src={product.productImgs[1]} alt="" width={"50%"} height={"70%"} />
                                    </div>

                                </div>
                                <div className='container-card-title'>
                                    <p>{product.title}</p>
                                </div>
                                <div className='container-card-price-car'>
                                    <div className='container-price'>
                                        <span>Price:</span>
                                        <p>${product.price}</p>
                                    </div>
                                    <i class="fa-solid fa-cart-shopping" onClick={() => navigate(`/product/${product.id}`)}></i>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`containe-cart ${ menu ?  'is-active' : ''}`}>
                <div className='title-cart'>
                    <p>Carrito de compras</p>
                </div>
                <div className='container-items-cart'>
                    {
                        productsCart.map(productc => (
                            <div key={productc.id} >
                                <div className="container-item-cart-trash-category">
                                   <p>{productc?.category.name}</p> 
                                   <i class="fa-solid fa-trash" onClick={() => dispatch(deleteItems(productc.id))}></i>
                                </div>
                                <div className='container-item-cart-titel'>
                                    <p>{productc?.title}</p>
                                </div>
                                <div className='container-item-cart-quantify'>
                                   <p>1</p> 
                                </div>
                                <div className='container-item-cart-price'>
                                    <spam>Total:</spam>
                                    <p>{productc?.price}</p>
                                </div>
                            </div>
                            
                        ))
                    }
                </div>
        </div>
        </div>
        
    );
};

export default Home;