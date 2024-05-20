/* eslint-disable react/prop-types */

import NoBooks from './NoBooks';

const BookList = ({ books, totalItems }) => {
    if (totalItems === 0) {
        return <NoBooks />;
    }

    return books.map((book) => (
        <div className='flex justify-center p-4 my-4' key={book.id}>
            <div className="flex flex-col md:flex-row w-[90%] border-2 drop-shadow-2xl p-2">
                <div className="w-full flex justify-center md:justify-normal md:w-1/4">
                    <img src={book.img} alt="Book image" className="h-[300px]" />
                </div>
                <div className="w-full md:w-2/4 flex flex-col justify-center md:justify-normal my-auto pl-4">
                    <h1 className='text-xl md:text-2xl font-bold'>{book.author}</h1>
                    <h1 className='text-xl md:text-2xl font-bold'>{book.title}</h1>
                    <p>{book.description}</p>
                </div>
                <div className='md:w-1/4 flex items-center justify-center'>
                    <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700'>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    ));
};

export default BookList;
