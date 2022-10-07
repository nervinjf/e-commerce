import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slice/products.slice';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { addCartThunk, deleteItems } from '../store/slice/cart.slice';
import { menuCategories } from '../store/slice/menucategory.slice';
import { menuPrices } from '../store/slice/menuprice.slice';

const Home = () => {

    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu);
    const menuPrice = useSelector(state => state.menuprice);
    const menucategory = useSelector(state => state.menucategory);
    const products = useSelector(state => state.products)

    const navigate = useNavigate()
    const [categories, setCtegories] = useState([]);
    const [productFiltered, setProductFilteres] = useState([]);
    const [searchValue, setSearchvalue] = useState([]);
    const [price, setPrice] = useState("");
    const [price1, setPrice1] = useState("");

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

    const addCart = () => {
        const cart = {
            "id": id,
            "quantity": 1
        }
        dispatch(addCartThunk(cart));
    }

    return (
        <div className='flex-home'>
            <div className='category'>
                <button className='btn-deletefilter' onClick={() => vertest()}>borrar filtros</button>
                <div className='filter-category'>
                    <div className='filter-category-title' onClick={() => dispatch(menuCategories(!menucategory))}>
                        <p>Categories</p>
                        <i className="fa-solid fa-chevron-down" style={menucategory === true ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}></i>
                    </div>
                    <div className={`con-filter-category-item ${menucategory ? 'is-active-categories' : 'con-filter-category-item'}`}>

                        {
                            categories.map(category => (
                                <div className='filter-category-item' key={category.id}>
                                    <p onClick={() => filterCategory(category.id)} >{category.name}</p>
                                </div>
                            ))

                        }
                    </div>
                </div>
                <div className='filter-price'>
                    <div className='filter-category-price' onClick={() => dispatch(menuPrices(!menuPrice))}>
                        <p>Price</p>
                        <i className="fa-solid fa-chevron-down" style={menuPrice === true ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}></i>
                    </div>
                    <div className={`filter-price-input-all ${menuPrice ? 'is-active-price' : ''}`}>
                        <div className='filter-price-input filter-price-input1'>
                            <label htmlFor="">From</label>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className='filter-price-input'>
                            <label htmlFor="">To</label>
                            <input type="number" value={price1} onChange={e => setPrice1(e.target.value)} />
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
                    <button onClick={() => searchProducts()}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="container-grid">
                    {
                        productFiltered.map(product => (
                            <div key={product.id} className="container-card" onClick={() => navigate(`/product/${product.id}`)}>
                                <div className='container-img'>
                                            <img className='container-img1' src={product.productImgs[0]} alt="" width={"10%"}/>
                                            <img className='container-img2' src={product.productImgs[1]} alt="" width={"10%"} />
                                </div>
                                <div className='container-card-title'>
                                    <p>{product.title}</p>
                                </div>
                                <div className='container-card-price-car'>
                                    <div className='container-price'>
                                        <span>Price:</span>
                                        <p>${product.price}</p>
                                    </div>
                                    <i className="fa-solid fa-cart-shopping" onClick={addCart}></i>
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