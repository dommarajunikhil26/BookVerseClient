import BookDescription from "./BookDescription"
import BooksAvailable from "./BooksAvailable"
import Reviews from "./Reviews"


const Checkout = () => {
    return (
        <div>
            <BookDescription />
            <BooksAvailable />
            <Reviews />
        </div>
    )
}

export default Checkout