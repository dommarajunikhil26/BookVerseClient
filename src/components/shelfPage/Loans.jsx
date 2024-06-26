import { useEffect, useState } from "react";
import axiosInstance from "../utility/AxiosInstance";
import LoanOptions from "./LoanOptions";
import { Container } from "../utility/Tools";

const Loans = () => {
    const [loansData, setLoansData] = useState([]);

    const currentBookLoans = async () => {
        try {
            const response = await axiosInstance.get(`/books/secure/currentloans`);
            setLoansData(response.data);
            return response.data;
        } catch (error) {
            console.error("Error while fetching the current book loans", error);
            return null;
        }
    }

    useEffect(() => {
        currentBookLoans();
    }, []);

    const handleBookReturn = (bookId) => {
        setLoansData(loansData.filter(loan => loan.book.id !== bookId));
    };

    const handleBookRenew = (bookId, newDaysLeft) => {
        setLoansData(loansData.map(loan => {
            if (loan.book.id === bookId) {
                return { ...loan, daysLeft: newDaysLeft };
            }
            return loan;
        }));
    };

    return (
        <div className="flex justify-center">
            <div className="w-[90%]">
                <h1 className="font-bold text-2xl my-4">Current Loans:</h1>
                {loansData.length === 0 ?
                    (
                        <Container textMessage="No loans exist at this time" />
                    ) : (
                        loansData.map((loan) => (
                            <div key={loan.book.id} className="border shadow-lg rounded-lg my-4 p-4 flex flex-col md:flex-row justify-evenly items-center">
                                <div className="pb-4 md:pb-0">
                                    <img src={loan.book.img} alt={loan.book.title} className="h-[250px]" />
                                </div>
                                <div>
                                    <LoanOptions book={loan.book} daysLeft={loan.daysLeft} onBookReturn={handleBookReturn} onBookRenew={handleBookRenew} />
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
};

export default Loans;
