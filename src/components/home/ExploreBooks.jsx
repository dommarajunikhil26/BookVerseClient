import { useNavigate } from "react-router-dom";

const ExploreBooks = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/searchBooks");
    };

    return (
        <div className="bg-[url('/src/assets/Images/PublicImages/image-2.jpg')] bg-cover bg-center h-[400px] flex items-center justify-center">
            <div className="flex flex-col text-white">
                <h1 className="text-3xl font-bold">Find your next adventure</h1>
                <p className="text-xl">Where would you like to go next?</p>
                <button className="p-2 bg-blue-600 w-1/2 mt-2" onClick={handleButtonClick}>Explore top books</button>
            </div>
        </div>
    )
}

export default ExploreBooks;
