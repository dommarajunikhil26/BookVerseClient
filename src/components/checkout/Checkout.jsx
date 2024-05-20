import BookDescription from "./BookDescription"
import CheckoutAndReviewBox from "./CheckoutAndReviewBox"
import LatestReviews from "./LatestReviews"


const Checkout = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row ml-2 mr-2 md:ml-6 md:mr-6 md:justify-evenly border-b-[1px]">
                <BookDescription />
                <CheckoutAndReviewBox />
            </div>
            <LatestReviews />
        </div>
    )
}

export default Checkout