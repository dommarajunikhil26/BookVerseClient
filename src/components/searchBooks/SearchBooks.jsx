/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchBooksByCategory, fetchBooksBySearch } from "../redux/bookSlice";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import BookList from "./BookList";
import Pagination from "../utility/Pagination";
import { Loading } from "../utility/Tools";

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
        if (!category) {
            dispatch(fetchBooks({ page, size }));
        } else {
            dispatch(fetchBooksByCategory({ page, size, category }));
        }
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
    };

    if (isLoading) {
        return (
            <Loading />
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
                <SearchBar handleSearch={handleSearch} />
                <CategoryDropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} handleFetchByCategory={handleFetchByCategory} />
            </div>
            <div className="ml-2">
                <p>Number of results: {totalItems}</p>
            </div>
            <BookList books={books} totalItems={totalItems} />
            {totalItems > 0 && (
                <Pagination
                    page={page}
                    size={size}
                    totalItems={totalItems}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default SearchBooks;
