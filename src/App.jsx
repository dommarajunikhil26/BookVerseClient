import { Route, Routes } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './components/redux/authSlice';
import Footer from "./components/header_footer/Footer"
import Header from "./components/header_footer/Header"
import Home from "./components/home/Home"
import Signin from "./components/signin_register/Signin"
import Register from "./components/signin_register/Register"
import ChangePassword from "./components/signin_register/ChangePassword"
import SearchBooks from "./components/searchBooks/SearchBooks"
import Checkout from "./components/checkout/Checkout"
import Reviews from "./components/checkout/Reviews"


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/searchBooks" element={<SearchBooks />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App