import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Loading } from '../utility/Tools';
import Pagination from "../utility/Pagination";
import { fetchBooks } from "../redux/bookSlice";

const ChangeBookQuantity = () => {
    const { books, isLoading, error, totalItems } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    useEffect(() => {
        dispatch(fetchBooks({ page, size }));
    }, [dispatch, page, size]);


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

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <Container textMessage={error} />
        );
    }

    const handleDeleteButtonClick = (e) => {
        console.log(e);
    };

    const handleAddButtonClick = (e) => {
        console.log(e);
    }

    const handleDecreaseButtonClick = (e) => {
        console.log(e);
    }

    return (
        <div>
            {books.map((book) => (
                <div className='flex justify-center p-4 my-4' key={book.id}>
                    <div className="flex flex-col w-[90%] border-2 drop-shadow-2xl p-2">
                        <div className="flex flex-col md:flex-row justify-evenly">
                            <div className="w-full flex justify-center md:justify-normal md:w-1/4">
                                <img src={book.img} alt="Book image" className="h-[150px]" />
                            </div>
                            <div className="w-full mt-2 mb-2 md:mt-0 md:mb-0 md:w-2/4 flex flex-col justify-center md:justify-normal my-auto pl-4">
                                <h1 className='text-xl md:text-2xl font-bold'>{book.author}</h1>
                                <h1 className='text-xl md:text-2xl font-bold'>{book.title}</h1>
                                <p>{book.description}</p>
                            </div>
                            <div className="mt-2">
                                <p className="mb-2">Total Quantity: {book.copies}</p>
                                <p>Books Remaining: {book.copiesAvailable}</p>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className='md:w-1/4 my-2'>
                                <button className='p-2 bg-red-600 rounded text-white hover:bg-red-700' onClick={() => handleDeleteButtonClick(book)}>
                                    Delete
                                </button>
                            </div>
                            <div className='w-full flex items-center my-2'>
                                <button className='p-2 w-full bg-blue-700 rounded text-white hover:bg-blue-900' onClick={() => handleAddButtonClick(book)}>
                                    Add Quantity
                                </button>
                            </div>
                            <div className='w-full flex items-center '>
                                <button className='p-2 w-full bg-yellow-500 rounded text-white hover:bg-yellow-400' onClick={() => handleDecreaseButtonClick(book)}>
                                    Decrease Quantity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
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
    )
}

export default ChangeBookQuantity