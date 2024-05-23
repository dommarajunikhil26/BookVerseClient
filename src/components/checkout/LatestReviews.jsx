/* eslint-disable react/prop-types */
const LatestReviews = ({ reviews, bookId }) => {
    const bookReviews = Array.isArray(reviews) ? reviews.filter(review => review.bookId === bookId) : [];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Latest Reviews</h2>
            {bookReviews.length > 0 ? (
                <ul>
                    {bookReviews.map((review) => (
                        <li key={review.id} className="mb-2">
                            <div className="flex items-center">
                                <span className="font-bold">{review.reviewerName}</span>
                                <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                            </div>
                            <div>{review.text}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available for this book.</p>
            )}
        </div>
    );
};

export default LatestReviews;
