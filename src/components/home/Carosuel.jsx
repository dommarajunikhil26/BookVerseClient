/* eslint-disable react/no-unescaped-entities */
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useEffect } from 'react';

import book3 from '../../assets/Images/BooksImages/new-book-3.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/bookSlice';
import { responsive } from '../utility/Tools';

const Carosuel = () => {
    const dispath = useDispatch();
    const { books, isLoading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispath(fetchBooks({ page: 0, size: 9 }));
    }, [dispath]);

    if (isLoading) {
        return (
            <div className='h-[500px] w-full border-2 border-black flex items-center justify-center'>
                <p className='text-3xl'>Loading ...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className='h-[400px] w-[400px] border-2 border-black'>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className='p-2 md:my-4 flex flex-col justify-center'>
            <p className='text-center p-4 md:p-6 '>Find your next "I stayed up too late reading" book</p>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {books.map(book => (
                    <div className='px-4' key={book.id}>
                        {book.img ?
                            <img src={book.img} alt={book.title} />
                            :
                            <img src={book3} alt="Crash Course in Python" />
                        }
                        <h3 className='text-center text-lg font-semibold'>
                            {book.title}
                        </h3>
                        <p className='text-center'>
                            {book.author}
                        </p>
                        <div className="flex justify-center">
                            <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700'>
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}

            </Carousel>
            <div className='flex justify-center my-4'>
                <button className='border-[2px] border-grey-950 p-2'>View More</button>
            </div>
        </div>
    )
}

export default Carosuel