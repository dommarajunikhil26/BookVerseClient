/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utility/AxiosInstance";

const CheckoutAndReviewBox = ({ isAuthenticated, book }) => {
    const navigate = useNavigate();
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [copies, setCopies] = useState(book.copies);
    const [copiesAvailable, setCopiesAvailable] = useState(book.copiesAvailable);
    const [currentBookLoans, setCurrentBookLoans] = useState(0);

    const bookId = book.id;

    useEffect(() => {
        if (isAuthenticated) {
            const checkBookStatus = async () => {
                const checkedOut = await isBookCheckedOut(bookId);
                setIsCheckedOut(checkedOut);
            };
            checkBookStatus();

            const fetchCurrentLoans = async () => {
                const loans = await currentLoans();
                setCurrentBookLoans(loans);
            };
            fetchCurrentLoans();
        }
    }, [isAuthenticated, bookId]);

    const isBookCheckedOut = async (bookId) => {
        try {
            const response = await axiosInstance.get(`/books/secure/ischeckedout/byuser`, {
                params: { bookId }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking book status', error);
            return false;
        }
    };

    const checkoutBook = async (bookId) => {
        try {
            const response = await axiosInstance.put(`/books/secure/checkout`, null, {
                params: { bookId }
            });
            setCopies(response.data.copies);
            setCopiesAvailable(response.data.copiesAvailable);
            return response.data;
        } catch (error) {
            console.error('Error while checking out book', error);
            return false;
        }
    };

    const currentLoans = async () => {
        try {
            const response = await axiosInstance.get(`/books/secure/currentloans/count`);
            return response.data;
        } catch (error) {
            console.error('Error while fetching current loans', error);
            return 0;
        }
    };

    const updateCurrentLoans = async () => {
        const loans = await currentLoans();
        setCurrentBookLoans(loans);
    };

    const handleSignInButtonClick = () => {
        navigate("/signin");
    };

    const handleCheckoutButtonClick = async () => {
        const checkedOut = await checkoutBook(bookId);
        if (checkedOut) {
            setIsCheckedOut(true);
            await updateCurrentLoans();  // Update the current loans count after successful checkout
        }
    };

    return (
        <div className="w-full md:w-1/4 h-[250px] md:h-[350px] md:mt-10 border-2 drop-shadow-2xl flex flex-col items-center">
            <div className="w-[90%] border-b-[1px] pt-2">
                <p className="text-md md:text-xl">{currentBookLoans}/5 books checked out</p>
            </div>
            <div className="flex flex-col border-b-[1px] w-[90%]">
                <p className="text-green-700 text-lg md:text-xl">Available</p>
                <div className="flex flex-row justify-between">
                    <p className="mr-4 text-md md:text-xl">{copies} copies</p>
                    <p className="text-md md:text-xl">{copiesAvailable} available</p>
                </div>
                {isAuthenticated ?
                    (
                        isCheckedOut ?
                            (<p className="font-bold">Book checked out. Enjoy!</p>)
                            :
                            (currentBookLoans <= 5 ? <button className='p-2 my-4 bg-green-700 rounded text-white hover:bg-green-600 w-1/3' onClick={handleCheckoutButtonClick}>
                                Checkout
                            </button> : <p className="text-red-600">Top many books checked out</p>)
                    )
                    :
                    (<button className='p-2 my-4 bg-green-700 rounded text-white hover:bg-green-600 w-1/3' onClick={handleSignInButtonClick}>
                        Sign in
                    </button>)
                }
            </div>
            <div className="w-[90%]">
                <p className="text-md md:text-xl">The number can change until placing order has been complete.</p>
                <p className="pt-4 text-md md:text-xl">Sign in to be able to leave a review</p>
            </div>
        </div>
    )
}

export default CheckoutAndReviewBox;
