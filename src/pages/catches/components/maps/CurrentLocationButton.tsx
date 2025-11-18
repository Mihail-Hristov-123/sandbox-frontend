export const CurrentLocationButton = ({
    setCurrentPosition,
}: {
    setCurrentPosition: (position: [number, number]) => void;
}) => {
    if (!('geolocation' in navigator)) {
        return null;
    }

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) =>
                setCurrentPosition([latitude, longitude]),
        );
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="bg-primary absolute bottom-0 right-0 text-white px-3 py-1 rounded-tl-big"
        >
            Use my current location
        </button>
    );
};
