import { useState } from 'react';
import logo from '../../assets/logo/bookLogo2.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice'

const Header = () => {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleMenuClick = () => {
        setClicked(!clicked)
    };

    const handleHomeClick = () => {
        navigate("/");
    }

    const handleSearchClick = () => {
        navigate("/searchBooks");
    }

    const handleSigninClick = () => {
        if (isAuthenticated) {
            dispatch(logoutUser()).then(() => {
                navigate("/signin");
            });
        } else {
            navigate("/signin");
        }
    }

    const handleShelfClick = () => {
        navigate("/shelf");
    }

    const handleAdminClick = () => {
        navigate("/admin");
    }
    return (
        <header className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={handleMenuClick}
                        >
                            {clicked ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src={logo} alt="book verse" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleHomeClick}>Home</button>
                                <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleSearchClick}>Search Books</button>
                                {isAuthenticated && (
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleShelfClick}>Shelf</button>
                                )}
                                {isAuthenticated && user.claims?.admin && (
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleAdminClick}>Admin</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm border-[1px] border-gray-50 text-gray-300 hover:text-white px-3 py-2  font-medium" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={handleSigninClick}>
                                    {isAuthenticated ? "Log out" : "Sign in"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            {clicked && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <button className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" onClick={handleHomeClick}>Home</button>
                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={handleSearchClick}>Search Books</button>
                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={handleShelfClick}>Shelf</button>
                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={handleShelfClick}>Admin</button>
                    </div>
                </div>
            )}
        </header>

    )
}

export default Header