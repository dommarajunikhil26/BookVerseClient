import { useNavigate } from "react-router-dom"


const CheckoutAndReviewBox = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/signin");
    };

    return (
        <div className="w-full md:w-1/4 h-[250px] md:h-[300px] md:mt-10 border-2 drop-shadow-2xl flex flex-col items-center">
            <div className="w-[90%] border-b-[1px] pt-2">
                <p className="text-md md:text-xl">0/5 books checked out</p>
            </div>
            <div className="flex flex-col border-b-[1px] w-[90%]">
                <p className="text-green-700 text-lg md:text-xl">Available</p>
                <div className="flex flex-row justify-between">
                    <p className="mr-4 text-md md:text-xl">10 copies</p>
                    <p className="text-md md:text-xl">10 available</p>
                </div>
                <button className='p-2 my-4 bg-green-700 rounded text-white hover:bg-green-600 w-1/3' onClick={handleButtonClick}>
                    Sign in
                </button>
            </div>
            <div className="w-[90%]">
                <p className="text-md md:text-xl">The number can change until placing order has been complete.</p>
                <p className="pt-4 text-md md:text-xl">Sign in to be able to leave a review</p>
            </div>
        </div>
    )
}

export default CheckoutAndReviewBox