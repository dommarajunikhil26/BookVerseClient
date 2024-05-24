/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageLoanModal from "./ManageLoanModal";

const LoanOptions = ({ book, daysLeft }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleReviewButtonClick = () => {
        navigate(`/checkout/${book.id}`, { state: { book } });
    }

    const handleSearchBooks = () => {
        navigate("/searchBooks");
    }

    const handleManageLoanButtonClick = () => {
        setShowModal(true);
    }

    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between h-[275px] w-[250px]">
            <div>
                <h1 className="font-bold text-lg mb-2">Loan Options</h1>
                <p className="text-gray-600 text-sm mb-4">Due in {daysLeft} days</p>
                <div className="flex flex-col space-y-2 mb-2">
                    <button
                        className="border border-gray-300 rounded-md p-1 text-md hover:bg-gray-200"
                        onClick={handleManageLoanButtonClick}
                    >
                        Manage Loan
                    </button>
                    <button
                        className="border border-gray-300 rounded-md p-1 text-md hover:bg-gray-200"
                        onClick={handleSearchBooks}
                    >
                        Search more books?
                    </button>
                </div>
                <p className="text-gray-600 text-sm">Help others find their adventure by reviewing your loan.</p>
            </div>
            <button
                className="bg-blue-600 text-white rounded-md p-1 text-md hover:bg-blue-500"
                onClick={handleReviewButtonClick}
            >
                Leave a review
            </button>

            {showModal && (
                <ManageLoanModal book={book} daysLeft={daysLeft} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default LoanOptions;
