import { useNavigate } from "react-router-dom"
import StarRating from "./StarsRating";


const LatestReviews = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/reviews");
    };

    return (
        <div className="w-full flex flex-col items-center mt-4">
            <div className="w-[90%] flex flex-col md:flex-row">
                <div className="w-full md:w-1/4">
                    <h1 className="text-lg md:text-2xl font-bold">Latest Reviews:</h1>
                </div>
                <div className="w-full md:w-3/4 border-b-[1px] flex flex-row">
                    <div className="w-full md:w-2/3 ">
                        <p className="text-md md:text-xl font-bold">example1user@gmail.com</p>
                        <p className="text-md md:text-xl">September 5, 2024</p>
                        <p className="text-md md:text-xl">First book is pretty good book overall</p>
                    </div>
                    <StarRating />
                </div>

            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                <button className='p-1 md:p-1 my-4 bg-blue-700 rounded text-white hover:bg-blue-600 w-1/2 md:w-1/4' onClick={handleButtonClick}>
                    Read all reviews
                </button>
            </div>
        </div>
    )
}

export default LatestReviews