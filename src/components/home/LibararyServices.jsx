/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/Images/PublicImages/image-3.jpg';
import { useSelector } from 'react-redux';

const LibararyServices = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate("/messages");
        } else {
            navigate("/signin");
        }
    };

    return (
        <div className=' flex justify-center p-4 my-4'>
            <div className="flex flex-col md:flex-row w-[90%] border-2 drop-shadow-2xl p-2">
                <div className="w-full md:w-2/3 flex flex-col my-auto pl-4">
                    <h1 className='text-xl md:text-2xl font-bold'>Can't find what you are looking for?</h1>
                    <p>If you cannot find what you are looking for, send our library admin's a personal message!</p>
                    <div className='mt-2 mb-4 mb:mb-0'>
                        <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700' onClick={handleButtonClick}>
                            {isAuthenticated ? "Library Services" : "Sign up"}
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <img src={image1} alt="Clock image" />
                </div>
            </div>
        </div>
    )
}

export default LibararyServices