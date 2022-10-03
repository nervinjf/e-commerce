import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Logins from './pages/Logins'
import ProductsDetails from './pages/ProductsDetails'
import Home from './pages/Home'
import Purchases from './pages/Purchases'
import MyNavbar from './Components/MyNavbar'
import LoadingScreen from './Components/LoadingScreen'
import {useDispatch, useSelector} from 'react-redux'
import { getProductsThunk } from './store/slice/products.slice';
import Footer from './Components/Footer'
import Cart from './Components/Cart'

function App() {

  const isLoading = useSelector(state => state.loading)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProductsThunk());
  }, [])

  return (
      <HashRouter>
        <MyNavbar/>
        {isLoading && <LoadingScreen/>}
        {/* <Cart/> */}
        <Routes>
          <Route/>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:id" element={<ProductsDetails />}/>
          <Route path="/login" element={<Logins />}/>
          <Route path="/purchases" element={<Purchases />}/>
        </Routes>
        <Footer/>
      </HashRouter>
  )
}

export default App
