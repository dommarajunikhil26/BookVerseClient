/* eslint-disable react/prop-types */
import StarRateIcon from '@mui/icons-material/StarRate';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <IconButton
                        key={index}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <StarRateIcon
                            style={{
                                color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                                fontSize: '2rem',
                            }}
                        />
                    </IconButton>
                );
            })}
        </div>
    );
};

export default StarRating;
