import { Map, Marker, ZoomControl } from 'pigeon-maps';

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
            defaultCenter={markerCoordinates}
        >
            <Marker width={50} anchor={markerCoordinates} />
            <ZoomControl />
        </Map>
    );
};
