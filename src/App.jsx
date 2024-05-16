import { Route, Routes } from "react-router-dom"
import Footer from "./components/header_footer/Footer"
import Header from "./components/header_footer/Header"
import Home from "./components/home/Home"


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App