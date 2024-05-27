import { useDispatch, useSelector } from "react-redux";
import BookDescription from "./BookDescription";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import LatestReviews from "./LatestReviews";
import { useEffect, useState } from "react";
import { fetchReviews } from "../redux/reviewSlice";
import { useParams } from "react-router-dom";
import { Container, Loading } from "../utility/Tools";
import axiosInstance from "../utility/AxiosInstance";

const Checkout = () => {
    const dispatch = useDispatch();
    const { reviews, isLoading, error } = useSelector((state) => state.reviews);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [latestReviews, setLatestReviews] = useState([]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axiosInstance.get(`/books/${bookId}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details', error);
            }
        };

        fetchBookDetails();
        dispatch(fetchReviews());
    }, [dispatch, bookId]);

    useEffect(() => {
        setLatestReviews(reviews);
    }, [reviews]);

    const handleNewReview = (newReview) => {
        setLatestReviews((prevReviews) => [newReview, ...prevReviews]);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Container textMessage={`Error: ${error}`} />;
    }

    if (!book) {
        return <Container textMessage="No book details available" />;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row ml-2 mr-2 md:ml-6 md:mr-6 md:justify-evenly border-b-[1px]">
                <BookDescription reviews={reviews} book={book} />
                <CheckoutAndReviewBox isAuthenticated={isAuthenticated} book={book} onNewReview={handleNewReview} />
            </div>
            <LatestReviews reviews={latestReviews} bookId={book.id} />
        </div>
    );
}

export default Checkout;
