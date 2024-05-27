/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import axiosInstance from "../utility/AxiosInstance";

const AddNewBooks = () => {
    const [displayMessage, setDisplayMessage] = useState("");
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const categories = [
        { value: 'FE', label: 'Front End' },
        { value: 'BE', label: 'Back End' },
        { value: 'Data', label: 'Data Science' },
        { value: 'DevOps', label: 'DevOps' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/admin/secure/add/book`, {
                title: title,
                author: author,
                description: description,
                copies: copies,
                category: category,
                img: file
            });
            setDisplayMessage('Book Added Successfully');
            setTitle('');
            setAuthor('');
            setDescription('');
            setCopies(0);
            setCategory('');
            setFile(null);
        } catch (error) {
            console.error('Error while posting book', error);
            setDisplayMessage('Error while adding book');
        }
    };

    const handleTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const handleAuthorChange = useCallback((e) => {
        setAuthor(e.target.value);
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setCategory(category);
        setDropdownOpen(false);
    }, []);

    const handleDescriptionChange = useCallback((e) => {
        setDescription(e.target.value);
    }, []);

    const handleCopiesChange = useCallback((e) => {
        setCopies(e.target.value);
    }, []);

    const handleFileChange = useCallback((e) => {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }, []);

    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFile(reader.result);
        }
        reader.onerror = (error) => {
            console.log('Error: ', error);
        }
    };

    return (
        <div className='flex items-center flex-col pt-4'>
            {displayMessage && (
                <div className={`w-[90%] border-2 p-2 ${displayMessage.includes('Success') ? 'bg-green-400' : 'bg-red-400'}`}>
                    <p className={`text-${displayMessage.includes('Success') ? 'green' : 'red'}-900`}>{displayMessage}</p>
                </div>
            )}
            <form className='w-[90%] border-2' onSubmit={handleSubmit}>
                <div className='bg-gray-300'>
                    <p className='text-md py-2 pl-2 md:pl-4'>Add a New Book</p>
                </div>
                <div className='ml-2 mr-2 md:ml-10 md:mr-10'>
                    <div className='my-4 flex flex-col lg:flex-row'>
                        <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-2">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="off"
                                value={title}
                                required
                                onChange={handleTitleChange}
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 lg:mx-2">
                            <label htmlFor="author">Author</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                autoComplete="off"
                                value={author}
                                required
                                onChange={handleAuthorChange}
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="w-full lg:w-1/4 lg:ml-2 relative">
                            <label htmlFor="category">Category</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-300 flex justify-between items-center"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {categories.find(cat => cat.value === category)?.label || 'Select category'}
                                    <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.168l3.71-3.938a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {dropdownOpen && (
                                    <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {categories.map((cat) => (
                                            <li
                                                key={cat.value}
                                                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${cat.value === category ? 'text-white bg-indigo-600' : 'text-gray-900'}`}
                                                onClick={() => handleCategoryChange(cat.value)}
                                            >
                                                <span className="block truncate">{cat.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <label htmlFor="description" className='py-4'>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            autoComplete="off"
                            value={description}
                            required
                            onChange={handleDescriptionChange}
                            className="block w-full p-2 h-[100px] md:h-[150px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            style={{ verticalAlign: 'top' }}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="copies" className="py-4">Copies</label>
                        <input
                            id="copies"
                            name="copies"
                            type="number"
                            value={copies}
                            required
                            onChange={handleCopiesChange}
                            className="block w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="file" className="py-4">Upload Image</label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            required
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            className="block w-full lg:w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className='my-4 ml-2 mr-2 md:ml-10 md:mr-10'>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddNewBooks;
