/* eslint-disable react/no-unescaped-entities */
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import book1 from '../../assets/Images/BooksImages/new-book-1.png';
import book2 from '../../assets/Images/BooksImages/new-book-2.png';
import book3 from '../../assets/Images/BooksImages/new-book-3.png';

const Carosuel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='m-2 md:my-4 flex flex-col justify-center'>
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
                <div>
                    <img src={book1} alt="Book 1" />
                    <h3 className='text-center text-lg font-semibold'>
                        Advanced Techniques in C#
                    </h3>
                    <p className='text-center'>
                        Arda Luv
                    </p>
                    <div className="flex justify-center">
                        <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700'>
                            Reserve
                        </button>
                    </div>
                </div>
                <div>
                    <img src={book2} alt="Book 2" />
                    <h3 className='text-center text-lg font-semibold'>
                        The Expert Guide To Machine Learning
                    </h3>
                    <p className='text-center'>
                        Ahmet Luv
                    </p>
                    <div className="flex justify-center">
                        <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700'>
                            Reserve
                        </button>
                    </div>
                </div>
                <div>
                    <img src={book3} alt="Book 3" />
                    <h3 className='text-center text-lg font-semibold'>
                        Crash Course in Python
                    </h3>
                    <p className='text-center'>
                        John Luv
                    </p>
                    <div className="flex justify-center">
                        <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700'>
                            Reserve
                        </button>
                    </div>
                </div>
            </Carousel>
            <div className='flex justify-center my-4'>
                <button className='border-[2px] border-grey-950 p-2'>View More</button>
            </div>
        </div>
    )
}

export default Carosuel