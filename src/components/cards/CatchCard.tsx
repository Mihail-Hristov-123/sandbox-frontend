import { useState } from 'react';
import { AuthorField } from '../AuthorField';
import { LocationPreview } from '../maps/LocationPreview';

export interface CatchValues {
    authorName: string;
    title: string;
    coordinates: [number, number];
    imgLink: string;
}

export const CatchCard = ({
    authorName,
    title,
    coordinates,
    imgLink,
}: CatchValues) => {
    const [locationDisplayed, setLocationDisplayed] = useState(false);

    return (
        <article className="w-full shadow-2xl rounded-big p-4 space-y-4">
            <AuthorField name={authorName} />

            <h2 className="text-xl font-semibold">{title}</h2>

            <img
                src={imgLink}
                alt="Fish photo"
                className="rounded-md w-full object-cover"
            />

            <button
                onClick={() => setLocationDisplayed(!locationDisplayed)}
                className="flex items-center gap-2 font-medium"
            >
                <span>
                    {locationDisplayed ? 'Hide location' : 'Show location'}
                </span>
            </button>

            <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    locationDisplayed ? 'max-h-80' : 'max-h-0'
                }`}
            >
                <div
                    className={`transition-all duration-500 ease-in-out transform ${
                        locationDisplayed
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-2'
                    }`}
                >
                    <LocationPreview markerCoordinates={coordinates} />
                </div>
            </div>
        </article>
    );
};
