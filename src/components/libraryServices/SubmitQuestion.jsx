/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import axiosInstance from '../utility/AxiosInstance';

const SubmitQuestion = () => {
    const [field1, setField1] = useState("");
    const [field2, setField2] = useState("");
    const [dislayMessage, setDisplayMessage] = useState("");

    const postQuestion = async (title, question) => {
        try {
            const response = await axiosInstance.post(`/messages/secure/add/message`, {
                title: title,
                question: question
            });
        } catch (error) {
            console.error('Error posting question:', error);
        }
    };

    const handleField1Change = useCallback((e) => {
        const value = e.target.value;
        setField1(value);
        setDisplayMessage('');
    }, []);

    const handleField2Change = useCallback((e) => {
        const value = e.target.value;
        setField2(value);
        setDisplayMessage('');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Question submitted");
        postQuestion(field1, field2);
        setField1('');
        setField2('');
        setDisplayMessage("Quesion Submitted Successfully");
    };

    return (
        <div className='flex items-center flex-col pt-4'>
            {dislayMessage.length !== 0 && (
                <div className='w-[90%] border-2 p-2 bg-green-400'>
                    <p className='text-green-900'>{dislayMessage}</p>
                </div>
            )}
            <form className='w-[90%] border-2' onSubmit={handleSubmit}>
                <div className='bg-gray-300'>
                    <p className='text-md py-2 pl-2 md:pl-4'>Ask question to the Admin</p>
                </div>
                <div className='ml-2 mr-2 md:ml-10 md:mr-10'>
                    <div className='my-4'>
                        <label htmlFor="field1" >Title</label>
                        <input
                            id="field1"
                            name="field1"
                            type="text"
                            autoComplete="off"
                            value={field1}
                            required
                            placeholder='Title'
                            onChange={handleField1Change}
                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="field2" className='py-4'>Question</label>
                        <textarea
                            id="field2"
                            name="field2"
                            autoComplete="off"
                            value={field2}
                            required
                            placeholder='Enter your question...'
                            onChange={handleField2Change}
                            className="block w-full p-2 h-[100px] md:h-[150px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            style={{ verticalAlign: 'top' }}
                        />
                    </div>
                </div>
                <div className='my-4 flex justify-center'>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SubmitQuestion;
