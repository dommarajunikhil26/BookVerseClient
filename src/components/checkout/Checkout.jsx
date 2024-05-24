
import { useDispatch, useSelector } from "react-redux";
import BookDescription from "./BookDescription";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import LatestReviews from "./LatestReviews";
import { useEffect, useState } from "react";
import { fetchReviews } from "../redux/reviewSlice";
import { useLocation } from "react-router-dom";
import { Loading } from "../utility/Tools";

const Checkout = () => {
    const dispatch = useDispatch();
    const { reviews, isLoading, error } = useSelector((state) => state.reviews);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();
    const { book } = location.state || {};
    const [latestReviews, setLatestReviews] = useState([]);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

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
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>No book details available</div>;
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