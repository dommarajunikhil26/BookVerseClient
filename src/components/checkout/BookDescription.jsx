import { useLocation } from 'react-router-dom';
import StarRating from './StarsRating';
import { useState } from 'react';

const BookDescription = () => {
    const [rating, setRating] = useState(0);
    const location = useLocation();
    const { book } = location.state || {};

    if (!book) {
        return <p>No book details available</p>;
    }

    return (
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:justify-around mt-6 md:mt-10">
            <div className='w-full md:w-1/4 flex justify-center md:justify-normal '>
                <img src={book.img} alt="Book image" className="h-[300px]" />
            </div>
            <div className='w-full md:w-1/2 p-4 md:p-0 '>
                <h1 className='text-lg md:text-2xl font-bold'>{book.title}</h1>
                <h2 className='text-md md:text-xl font-semibold text-blue-400'>{book.author}</h2>
                <p className='mt-4'>{book.description}</p>
                <StarRating rating={rating} setRating={setRating} />
            </div>
        </div>
    );
}

export default BookDescription;
