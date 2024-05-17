

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="bg-blue-950 w-full p-3">
            <p className="text-gray-50 font-medium text-center text-sm">Nikhil Sai Dommaraju. @All Rights Reserved {year}</p>
        </footer>
    )
}

export default Footer