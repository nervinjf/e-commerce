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
import ProtectedRoutes from './Components/ProtectedRoutes';
import CartSideBar from './Components/CartSideBar'
import SingUp from './pages/SingUp'

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
        <CartSideBar/>
        {/* <Cart/> */}
        <Routes>
          <Route path="/login" element={<Logins />}/>
          <Route path="/singup" element={<SingUp />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:id" element={<ProductsDetails />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />}/>
          </Route>

        </Routes>
        <Footer/>
      </HashRouter>
  )
}

export default App
