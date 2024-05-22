import { useDispatch, useSelector } from "react-redux";
import BookDescription from "./BookDescription";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import LatestReviews from "./LatestReviews";
import { useEffect } from "react";
import { fetchReviews } from "../redux/reviewSlice";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const dispatch = useDispatch();
    const { reviews, isLoading, error } = useSelector((state) => state.reviews);
    const location = useLocation();
    const { book } = location.state || {};

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
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
                <CheckoutAndReviewBox />
            </div>
            <LatestReviews reviews={reviews} bookId={book.id} />
        </div>
    );
}

export default Checkout;
