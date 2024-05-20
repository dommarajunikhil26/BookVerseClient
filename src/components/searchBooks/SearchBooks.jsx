/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchBooksByCategory, fetchBooksBySearch } from "../redux/bookSlice";
import { useEffect, useState } from "react";
import NoBooks from "./NoBooks";

const SearchBooks = () => {
    const { books, isLoading, error, totalItems } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    useEffect(() => {
        dispatch(fetchBooks({ page, size }));
    }, [dispatch, page, size]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFetchByCategory = (category) => {
        dispatch(fetchBooksByCategory({ page, size, category }));
        setIsDropdownOpen(false);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if ((page + 1) * size < totalItems) {
            setPage(page + 1);
        }
    };

    const handlePageChange = (pageIndex) => {
        setPage(pageIndex);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const title = e.target.elements.searchInput.value;
        dispatch(fetchBooksBySearch({ page, size, title }));
    }

    if (isLoading) {
        return (
            <div className='h-[500px] w-full border-2 border-black flex items-center justify-center'>
                <p className='text-3xl'>Loading ...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='h-[400px] w-[400px] border-2 border-black'>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center p-4">
                <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg">
                    <div className="flex w-full relative">
                        <input name="searchInput" type="text" className="px-2 py-2 w-full bg-gray-100 shadow-inner rounded-l-md border border-gray-400 focus:outline-none" placeholder="Search for books" required />
                        <button className="bg-blue-600 text-gray-200 px-5 py-2 rounded-r-md shadow" type="submit">Search</button>
                    </div>
                </form>
                <div className="relative mt-2 md:mt-0 md:ml-4">
                    <button onClick={toggleDropdown} className="flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                        <span className="mr-2">Category</span>
                        <svg className={`w-5 h-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-50">
                            <a href="#" onClick={() => handleFetchByCategory('')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">All</a>
                            <a href="#" onClick={() => handleFetchByCategory('FE')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Front End</a>
                            <a href="#" onClick={() => handleFetchByCategory('BE')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Back End</a>
                            <a href="#" onClick={() => handleFetchByCategory('Data')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Data Science</a>
                            <a href="#" onClick={() => handleFetchByCategory('DevOps')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">DevOps</a>
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-2">
                <p>
                    Number of results: {totalItems}
                </p>
            </div>
            {totalItems === 0 ? (
                <NoBooks />
            ) : (
                books.map((book) => (
                    <div className='flex justify-center p-4 my-4' key={book.id}>
                        <div className="flex flex-col md:flex-row w-[90%] border-2 drop-shadow-2xl p-2">
                            <div className="w-full flex justify-center md:justify-normal md:w-1/4">
                                <img src={book.img} alt="Book image" className="h-[300px]" />
                            </div>
                            <div className="w-full md:w-2/4 flex flex-col justify-center md:justify-normal my-auto pl-4">
                                <h1 className='text-xl md:text-2xl font-bold'>{book.author}</h1>
                                <h1 className='text-xl md:text-2xl font-bold'>{book.title}</h1>
                                <p>{book.description}</p>
                            </div>
                            <div className='md:w-1/4 flex items-center justify-center'>
                                <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700'>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button onClick={handlePreviousPage} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                    <button onClick={handleNextPage} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing
                            <span className="font-medium ml-1 mr-1">{page * size + 1}</span>
                            to
                            <span className="font-medium ml-1 mr-1">{Math.min((page + 1) * size, totalItems)}</span>
                            of
                            <span className="font-medium ml-1 mr-1">{totalItems}</span>
                            items
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button onClick={handlePreviousPage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" disabled={page === 0}>
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {[...Array(Math.ceil(totalItems / size)).keys()].map((pageIndex) => (
                                <button
                                    key={pageIndex}
                                    onClick={() => handlePageChange(pageIndex)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === pageIndex ? 'bg-indigo-600 text-white' : ''}`}
                                    aria-current={page === pageIndex ? "page" : undefined}
                                >
                                    {pageIndex + 1}
                                </button>
                            ))}
                            <button onClick={handleNextPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" disabled={(page + 1) * size >= totalItems}>
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default SearchBooks;
