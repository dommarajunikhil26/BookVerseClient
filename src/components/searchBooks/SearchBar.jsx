/* eslint-disable react/prop-types */

const SearchBar = ({ handleSearch }) => (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg">
        <div className="flex w-full relative">
            <input name="searchInput" type="text" className="px-2 py-2 w-full bg-gray-100 shadow-inner rounded-l-md border border-gray-400 focus:outline-none" placeholder="Search for books" required />
            <button className="bg-blue-600 text-gray-200 px-5 py-2 rounded-r-md shadow" type="submit">Search</button>
        </div>
    </form>
);

export default SearchBar;
