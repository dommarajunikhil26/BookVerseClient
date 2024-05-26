import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthState } from './components/redux/authSlice';
import Footer from "./components/header_footer/Footer";
import Header from "./components/header_footer/Header";
import Home from "./components/home/Home";
import Signin from "./components/signin_register/Signin";
import Register from "./components/signin_register/Register";
import ChangePassword from "./components/signin_register/ChangePassword";
import SearchBooks from "./components/searchBooks/SearchBooks";
import Checkout from "./components/checkout/Checkout";
import Reviews from "./components/checkout/Reviews";
import ProtectedRoute from './components/utility/ProtectedRoute';
import { Loading } from "./components/utility/Tools";
import Shelf from "./components/shelfPage/Shelf";
import LibraryServices from "./components/libraryServices/LibraryServices";
import ManageLibraryPage from "./components/manageLibraryPage/ManageLibraryPage";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkAuthState());
      setLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/signin");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

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
          <Route path="/checkout/:bookId" element={<Checkout />} />
          <Route path="/reviews" element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          } />
          <Route path="/shelf" element={
            <ProtectedRoute>
              <Shelf />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute>
              <LibraryServices />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={<ManageLibraryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
