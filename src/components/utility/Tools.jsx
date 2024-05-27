/* eslint-disable react/prop-types */
export const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-24 w-24"></div>
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
    );
};

export const Container = ({ textMessage }) => {
    return (
        <div className="flex justify-center">
            <div className="w-[90%] shadow-xl my-4 h-[250px] flex items-center justify-center">
                <p className="text-lg font-mono font-bold ">{textMessage}</p>
            </div>
        </div>
    )
}