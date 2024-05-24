import { useLocation } from "react-router-dom"
import StarsRating from "./StarsRating";


const Reviews = () => {
    const location = useLocation();
    const { reviews, bookId } = location.state || {};

    if (!reviews || reviews.length === 0) {
        return (
            <div className="w-full flex flex-col items-center mt-4">
                No Reviews Available Currently.
            </div>
        );
    }

    const bookReviews = reviews.filter(review => review.bookId === bookId);
    return (
        <div className="w-full flex flex-col items-center mt-4">
            <h1 className="text-lg md:text-2xl font-bold">All Reviews:</h1>
            {bookReviews.map((review) => (
                <div key={review.id} className="w-[90%] md:w-[70%] border-b-[1px] p-4">
                    <p className="text-md md:text-lg font-bold">{review.userEmail || 'Anonymous'}</p>
                    <p className="text-sm md:text-md">{new Date(review.date).toLocaleDateString()}</p>
                    <p className="text-md md:text-lg">{review.reviewDescription}</p>
                    <StarsRating reviewRating={review.rating} />
                </div>
            ))}
        </div>
    )
}

export default Reviews
