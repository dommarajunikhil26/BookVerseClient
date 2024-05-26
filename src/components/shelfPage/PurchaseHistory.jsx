import { useEffect, useState } from "react";
import axiosInstance from '../utility/AxiosInstance';
import { useSelector } from "react-redux";
import Pagination from "../utility/Pagination";

const PurchaseHistory = () => {
    const { user } = useSelector((state) => state.auth);
    const [histories, setHistories] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchHistories = async () => {
            if (user && user.email) {
                try {
                    const userEmail = user.email;
                    const response = await axiosInstance.get(`/histories/search/findBooksByUserEmail`, {
                        params: {
                            userEmail,
                            page,
                            size
                        }
                    });
                    setHistories(response.data._embedded.histories);
                    setTotalItems(response.data.page.totalElements);
                    setSize(response.data.page.size);
                } catch (error) {
                    console.error('Error while fetching histories: ', error);
                }
            }
        }
        fetchHistories();
    }, [page, size, user]);

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if ((page + 1) * size < totalItems) {
            setPage(page + 1);
        }
    };

    const handlePageChange = (pageIndex) => {
        setPage(pageIndex);
    };

    return (
        <div>
            <div>
                {histories.length === 0 ? (
                    <div>No Books returned</div>
                ) : (
                    histories.map((history) => (
                        <div key={history.id} className="flex justify-center">
                            <div className="w-[90%]">
                                <div className="border shadow-xl rounded-lg my-4 p-4 flex flex-col md:flex-row justify-evenly items-center">
                                    <div className="pb-4 md:pb-0 w-full md:w-1/3 flex justify-center md:justify-normal">
                                        <img src={history.img} alt={history.title} className="h-[250px]" />
                                    </div>
                                    <div className="w-[90%] md:w-2/3">
                                        <div className="border-b-2 pb-2">
                                            <h1 className="font-semibold text-md">{history.author}</h1>
                                            <h1 className="font-semibold text-md">{history.title}</h1>
                                            <p className="text-sm">{history.description}</p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-sm text-gray-600">Checkout date: {history.checkoutDate}</p>
                                            <p className="text-sm text-gray-600">Returned date: {history.returnedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Pagination
                page={page}
                size={size}
                totalItems={totalItems}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default PurchaseHistory;
