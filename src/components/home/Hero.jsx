import image1 from '../../assets/Images/PublicImages/image-4.jpg';
import image2 from '../../assets/Images/PublicImages/image-1.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/signin")
    };
    return (
        <div className="w-screen my-3 md:my-6 overflow-hidden">
            <div className="w-screen flex flex-col md:flex-row pb-4 md:pb-0">
                <div className="w-full md:w-1/2">
                    <img
                        src={image1}
                        alt="sky image"
                        className="w-full h-[250px] object-cover object-top"
                    />
                </div>
                <div className="w-full md:w-1/2 flex items-center">
                    <div className='p-2 md:p-10 flex flex-col'>
                        <h1 className='lg:text-2xl font-bold'>What have you been reading?</h1>
                        <p className='mt-2'>
                            The library team would love to know what you have been reading. Whether it is to
                            learn a new skill or grow within one, we will be able to provide the top content
                            for you!
                        </p>
                        <div className='mt-2'>
                            <button className='p-2 bg-blue-500 rounded text-white hover:bg-blue-700' onClick={handleButtonClick}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-screen flex flex-col-reverse md:flex-row'>
                <div className="w-full md:w-1/2 flex items-center">
                    <div className='p-2 md:p-10'>
                        <h1 className='lg:text-2xl font-bold'>Our collection is always changing!</h1>
                        <p className='mt-2'>
                            Try to check in daily as our collection is always changing! We work nonstop to
                            provide the most accurate book selection possible for our Book Verse Read students!
                            We are diligent about our book selection and our books are always going to be our
                            top priority.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 overflow-hidden">
                    <img
                        src={image2}
                        alt="plant image"
                        className="w-full h-[250px] object-cover object-top md:object-left-top  scale-150"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero;
