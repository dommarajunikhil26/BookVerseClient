/* eslint-disable react/prop-types */
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { yellow } from '@mui/material/colors';

const StarsRating = ({ reviewRating }) => {
    const fullStars = Math.floor(reviewRating);
    const halfStars = reviewRating % 1 !== 0 ? 1 : 0;

    return (
        <div className="flex">
            {[...Array(fullStars)].map((_, index) => (
                <StarIcon key={index} sx={{ color: yellow[700] }} />
            ))}
            {halfStars > 0 && <StarHalfIcon sx={{ color: yellow[700] }} />}
        </div>
    );
}

export default StarsRating;
