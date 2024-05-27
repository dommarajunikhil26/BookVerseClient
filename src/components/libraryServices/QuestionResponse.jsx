import { useSelector } from 'react-redux';
import axiosInstance from '../utility/AxiosInstance';
import { useEffect, useState } from 'react';
import Pagination from '../utility/Pagination';

const QuestionResponse = () => {
    const { user } = useSelector((state) => state.auth);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const userEmail = user.email;
                const response = await axiosInstance.get(`/messages/search/findByUserEmail`, {
                    params: {
                        userEmail,
                        page,
                        size
                    }
                });
                setMessages(response.data._embedded.messages);
                setSize(response.data.page.size);
                setTotalItems(response.data.page.totalElements);
            } catch (error) {
                console.error('Error while fetching messages', error);
            }
        }
        fetchMessages();
    }, [page, size, user.email]);

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
            {messages.length === 0 ?
                (
                    <div>
                        <p>No Questions Found</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className='flex justify-center my-2'>
                            <div className='w-[90%] border-2 border-gray-300 shadow-xl'>
                                <div className='ml-4 mr-4 py-4'>
                                    <h1 className='font-semibold text-lg'>Case #{message.id}: {message.title}</h1>
                                    <p className='font-semibold text-sm'>{message.userEmail}</p>
                                    <p className='text-sm'>{message.question}</p>
                                </div>
                                <div className='ml-4 mr-4 border-t-2 py-4'>
                                    <p className='font-semibold text-lg'>Response:</p>
                                    <p className='text-sm italic'>{message.response !== null ? (message.response) : "Pending response from administration. Please be patient."}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
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

export default QuestionResponse