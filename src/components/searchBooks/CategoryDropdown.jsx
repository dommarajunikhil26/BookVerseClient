/* eslint-disable react/prop-types */

const CategoryDropdown = ({ isDropdownOpen, toggleDropdown, handleFetchByCategory }) => (
    <div className="relative mt-2 md:mt-0 md:ml-4">
        <button onClick={toggleDropdown} className="flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
            <span className="mr-2">Category</span>
            <svg className={`w-5 h-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
        {isDropdownOpen && (
            <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-50">
                <a href="#" onClick={() => handleFetchByCategory('')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">All</a>
                <a href="#" onClick={() => handleFetchByCategory('FE')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Front End</a>
                <a href="#" onClick={() => handleFetchByCategory('BE')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Back End</a>
                <a href="#" onClick={() => handleFetchByCategory('Data')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Data Science</a>
                <a href="#" onClick={() => handleFetchByCategory('DevOps')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">DevOps</a>
            </div>
        )}
    </div>
);

export default CategoryDropdown;
