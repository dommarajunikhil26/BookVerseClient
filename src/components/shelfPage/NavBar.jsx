
const NavBar = ({ activeTab, setActiveTab }) => {

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex justify-start space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ease-in-out ${activeTab === 'loans' ? 'text-white bg-blue-700' : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                            }`}
                        onClick={() => setActiveTab('loans')}
                    >
                        Loans
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ease-in-out ${activeTab === 'history' ? 'text-white bg-blue-700' : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                            }`}
                        onClick={() => setActiveTab('history')}
                    >
                        Your History
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar