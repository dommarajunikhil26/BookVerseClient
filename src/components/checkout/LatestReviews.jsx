/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import StarRating from "./StarsRating";

const LatestReviews = ({ reviews, bookId }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/reviews", { state: { reviews, bookId } });
    };

    if (!reviews || reviews.length === 0) {
        return (
            <div className="w-full flex flex-col items-center mt-4">
                No Reviews Available Currently.
            </div>
        );
    }

    const bookReviews = reviews.filter(review => review.bookId === bookId);

    if (bookReviews.length === 0) {
        return (
            <div className="w-full flex flex-col items-center mt-4">
                No Reviews Available for this Book.
            </div>
        );
    }

    const sortedReviews = [...bookReviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestReview = sortedReviews[0];

    return (
        <div className="w-full flex flex-col items-center mt-4">
            <div className="w-[90%] flex flex-col md:flex-row">
                <div className="w-full md:w-1/4">
                    <h1 className="text-lg md:text-2xl font-bold">Latest Review:</h1>
                </div>
                {latestReview && (
                    <div key={latestReview.id} className="w-full md:w-3/4 border-b-[1px] flex flex-row">
                        <div className="w-full md:w-2/3">
                            <p className="text-md md:text-xl font-bold">{latestReview.userEmail}</p>
                            <p className="text-md md:text-xl">{new Date(latestReview.date).toLocaleDateString()}</p>
                            <p className="text-md md:text-xl">{latestReview.reviewDescription}</p>
                        </div>
                        <StarRating reviewRating={latestReview.rating} />
                    </div>
                )}
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                <button className='p-1 md:p-1 my-4 bg-blue-700 rounded text-white hover:bg-blue-600 w-1/2 md:w-1/4' onClick={handleButtonClick}>
                    Read all reviews
                </button>
            </div>
        </div>
    );
}

export default LatestReviews;
