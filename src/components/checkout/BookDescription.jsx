/* eslint-disable react/prop-types */
import StarRating from './StarsRating';

const BookDescription = ({ reviews, book }) => {


    // Filter reviews for the current book
    const bookReviews = reviews.filter(review => review.bookId === book.id);

    // Calculate average rating
    const averageRating = bookReviews.reduce((sum, review) => sum + review.rating, 0) / bookReviews.length || 0;

    return (
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:justify-around mt-6 md:mt-10">
            <div className='w-full md:w-1/4 flex justify-center md:justify-normal '>
                <img src={book.img} alt="Book image" className="h-[300px]" />
            </div>
            <div className='w-full md:w-1/2 p-4 md:p-0 '>
                <h1 className='text-lg md:text-2xl font-bold'>{book.title}</h1>
                <h2 className='text-md md:text-xl font-semibold text-blue-400'>{book.author}</h2>
                <p className='mt-4'>{book.description}</p>
                <StarRating reviewRating={averageRating} />
                <p className='mt-2 font-mono'>{bookReviews.length} reviews</p>
            </div>
        </div>
    );
}

export default BookDescription;
