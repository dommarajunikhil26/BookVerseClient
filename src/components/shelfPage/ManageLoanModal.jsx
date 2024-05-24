/* eslint-disable react/prop-types */
import axiosInstance from "../utility/AxiosInstance";

const ManageLoanModal = ({ book, daysLeft, onClose, onBookReturn }) => {
    const handleReturnBook = async () => {
        try {
            const response = await axiosInstance.put(`/books/secure/return`, null, {
                params: { bookId: book.id }
            });
            console.log('Book returned successfully', response.data);
            onBookReturn(book.id);
            onClose();
        } catch (error) {
            console.error('Error while putting return book data', error);
        }
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-90">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">Loan Options</h1>
                    <button className="text-gray-700" onClick={onClose}>✖</button>
                </div>
                <div className="flex items-center mb-4">
                    <img src={book.img} alt={book.title} className="h-16 mr-4" />
                    <div>
                        <p className="text-sm font-semibold">{book.author}</p>
                        <p className="text-sm">{book.title}</p>
                    </div>
                </div>
                <p className="text-sm mb-4 text-gray-600">Due in {daysLeft} days</p>
                <div className="flex flex-col space-y-2 mb-4">
                    <button
                        className="border border-gray-300 rounded-md p-2 text-md hover:bg-gray-200"
                        onClick={handleReturnBook}
                    >
                        Return Book
                    </button>
                    <button className="border border-gray-300 rounded-md p-2 text-md hover:bg-gray-200">
                        Renew loan for 7 days
                    </button>
                </div>
                <div className="flex justify-end">
                    <button className="bg-gray-700 text-white rounded-md p-2 hover:bg-gray-600" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ManageLoanModal;
