import { useSelector } from "react-redux";
import axiosInstance from '../utility/AxiosInstance';
import Pagination from "../utility/Pagination";
import { useEffect, useState } from "react";
import { Container } from "../utility/Tools";

const Messages = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [messages, setMessages] = useState([]);
    const [fields, setFields] = useState({});

    const fetchUserMessages = async () => {
        if (isAuthenticated) {
            try {
                const response = await axiosInstance.get(`/messages/search/findByClosed`, {
                    params: {
                        closed: false,
                        page: page,
                        size: size
                    }
                });
                setMessages(response.data._embedded.messages);
                setSize(response.data.page.size);
                setTotalItems(response.data.page.totalElements);
            } catch (error) {
                console.error('Error while fetching closed messages: ', error);
            }
        }
    };

    useEffect(() => {
        fetchUserMessages();
    });

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if ((page + 1) * size < totalItems) {
            setPage(page + 1);
        }
    };

    const handlePageChange = (pageIndex) => {
        setPage(pageIndex);
    };

    const handleFieldChange = (id) => (e) => {
        const value = e.target.value;
        setFields((prevFields) => ({
            ...prevFields,
            [id]: value,
        }));
    };

    const handleSubmitResponse = (id) => async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/messages/secure/admin/message`, {
                id: id,
                response: fields[id]
            });
            setFields((prevFields) => ({
                ...prevFields,
                [id]: '',
            }));
            fetchUserMessages();
        } catch (error) {
            console.error('Error while putting questions response', error);
        }
    };

    return (
        <div>
            <h1 className="ml-4 md:ml-16 mt-4">Pending Q/A: </h1>
            <div>
                {messages.length === 0 ? (
                    <Container textMessage="No Questions available at this time from users." />
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
                                    <p className='text-sm pb-2'>Description</p>
                                    <form onSubmit={handleSubmitResponse(message.id)}>
                                        <textarea
                                            id={`field-${message.id}`}
                                            name={`field-${message.id}`}
                                            autoComplete="off"
                                            value={fields[message.id] || ''}
                                            required
                                            placeholder='Enter your response...'
                                            onChange={handleFieldChange(message.id)}
                                            className="block w-full p-2 h-[100px] md:h-[150px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ verticalAlign: 'top' }}
                                        />
                                        <button type="submit" className="px-4 py-2 my-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                                            Submit Response
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {messages.length > 0 && (
                <Pagination
                    page={page}
                    size={size}
                    totalItems={totalItems}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default Messages;
