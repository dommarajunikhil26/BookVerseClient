/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utility/AxiosInstance";
import StarsRating from './StarsRating';

const CheckoutAndReviewBox = ({ isAuthenticated, book, onNewReview }) => {
    const navigate = useNavigate();
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [copies, setCopies] = useState(book.copies);
    const [copiesAvailable, setCopiesAvailable] = useState(book.copiesAvailable);
    const [currentBookLoans, setCurrentBookLoans] = useState(0);
    const [starValue, setStarValue] = useState(null);
    const [showReviewOptions, setShowReviewOptions] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [isReviewPosted, setIsReviewPosted] = useState(false);

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

            const checkExistingReview = async () => {
                const existingReview = await hasUserReviewed(bookId);
                setIsReviewPosted(existingReview);
            };
            checkExistingReview();
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

    const hasUserReviewed = async (bookId) => {
        try {
            const response = await axiosInstance.get(`/review/secure/user/book`, {
                params: { bookId }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking user review', error);
            return false;
        }
    };

    const handleSignInButtonClick = () => {
        navigate("/signin");
    };

    const handleCheckoutButtonClick = async () => {
        const checkedOut = await checkoutBook(bookId);
        if (checkedOut) {
            setIsCheckedOut(true);
            await updateCurrentLoans();
        }
    };

    const handleStarChange = (value) => {
        setStarValue(value);
        setShowReviewOptions(false);
    }

    const toggleReviewOptions = () => {
        setShowReviewOptions(!showReviewOptions);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/review/secure', {
                rating: starValue,
                bookId: bookId,
                reviewDescription: reviewText,
            });
            const newReview = {
                id: response.data.id,
                userEmail: response.data.userEmail,
                date: new Date().toISOString(),
                rating: starValue,
                bookId: bookId,
                reviewDescription: reviewText,
            };
            setStarValue(null);
            setReviewText('');
            onNewReview(newReview);
            setIsReviewPosted(true);
        } catch (error) {
            console.error('Error submitting review', error);
        }
    };

    return (
        <div className="w-full md:w-1/4 h-[400px] md:h-[400px] md:mt-10 border-2 drop-shadow-2xl flex flex-col items-center">
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
                            </button> : <p className="text-red-600">Too many books checked out</p>)
                    )
                    :
                    (<button className='p-2 my-4 bg-green-700 rounded text-white hover:bg-green-600 w-1/3' onClick={handleSignInButtonClick}>
                        Sign in
                    </button>
                    )
                }
            </div>
            {isReviewPosted ? (
                <div className="w-[90%] mt-4">
                    <p className="font-bold">Thank you for the review!</p>
                </div>
            ) : (
                isAuthenticated ? (
                    <div className="w-[90%] relative">
                        <p className="text-md md:text-lg cursor-pointer flex items-center" onClick={toggleReviewOptions}>
                            Leave a review? <span className="ml-2">&#9662;</span>
                        </p>
                        {showReviewOptions && (
                            <ul className="absolute left-0 top-full mt-1 border rounded-md bg-white shadow-md max-h-40 overflow-y-auto">
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(0)}>0 star</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(0.5)}>0.5 star</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(1)}>1 star</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(1.5)}>1.5 star</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(2)}>2 stars</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(2.5)}>2.5 stars</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(3)}>3 stars</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(3.5)}>3.5 stars</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(4)}>4 stars</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(4.5)}>4.5 stars</li>
                                <li className="p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleStarChange(5)}>5 stars</li>
                            </ul>
                        )}
                        <StarsRating reviewRating={starValue} />
                    </div>
                ) : (
                    <div className="w-[90%]">
                        <p className="text-md md:text-xl">The number can change until placing order has been complete.</p>
                        <p className="pt-4 text-md md:text-xl">Sign in to be able to leave a review</p>
                    </div>
                )
            )}
            {starValue !== null && isAuthenticated && (
                <form onSubmit={handleReviewSubmit} className="w-[90%] mt-4">
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Write your review here..."
                        rows="4"
                    ></textarea>
                    <button type="submit" className="mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    )
}

export default CheckoutAndReviewBox;
