import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { Link } from 'react-router';

export const LocationPreview = ({
    markerCoordinates,
}: {
    markerCoordinates: [number, number];
}) => {
    return (
        <Map
            height={300}
            defaultZoom={10}
            minZoom={3}
            center={markerCoordinates}
        >
            <Marker width={50} anchor={markerCoordinates} />

            <ZoomControl />
            <button className="bg-primary absolute top-0 right-0 text-white px-3 py-1 rounded-bl-big">
                {' '}
                <Link
                    target="_blank"
                    to={`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${markerCoordinates[0]},${markerCoordinates[1]}`}
                >
                    Take me there
                </Link>
            </button>
        </Map>
    );
};
