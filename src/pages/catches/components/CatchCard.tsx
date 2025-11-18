import { AuthorField } from '@/components/AuthorField';
import { LocationPreview } from '@/pages/catches/components/maps/LocationPreview';
import type { CatchReturnValues } from '@/schemas/CatchSchema';
import { useState } from 'react';

export const CatchCard = ({
    user_username,
    title,
    latitude,
    longitude,
    imgLink,
}: CatchReturnValues) => {
    const [locationDisplayed, setLocationDisplayed] = useState(false);

    return (
        <article className="w-full shadow-2xl rounded-big p-4 space-y-4">
            <AuthorField name={user_username} />

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
                    <LocationPreview
                        markerCoordinates={[latitude, longitude]}
                    />
                </div>
            </div>
        </article>
    );
};
