import { Route, Routes } from "react-router-dom"
import Footer from "./components/header_footer/Footer"
import Header from "./components/header_footer/Header"
import Home from "./components/home/Home"
import Signin from "./components/signin_register/Signin"
import Register from "./components/signin_register/Register"
import ChangePassword from "./components/signin_register/ChangePassword"


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App