import { AuthorField } from '@/components/AuthorField';
import { LocationPreview } from '@/pages/catches/components/maps/LocationPreview';
import { useState } from 'react';
import { LikeButton } from '@/components/LikeButton';
import { useLikesService } from '@/hooks/useLikesService';
import type { Catch } from '@/types';

export const CatchCard = ({
    user_username,
    title,
    latitude,
    longitude,
    catch_pic_url,
    profile_pic_url,
    id,
}: Catch) => {
    const [locationDisplayed, setLocationDisplayed] = useState(false);
    const { likedByUser, likesCount, likeOrDislike } = useLikesService(
        'catches',
        id,
    );

    return (
        <article className="w-full shadow-2xl rounded-big p-4 space-y-4">
            <div className="flex justify-between items-center">
                {' '}
                <AuthorField
                    name={user_username}
                    profilePictureLink={profile_pic_url}
                />
                <LikeButton
                    likedByUser={likedByUser}
                    likesCount={likesCount}
                    handleLike={likeOrDislike}
                />
            </div>

            <h2 className="text-xl font-semibold">{title}</h2>

            <img
                src={catch_pic_url}
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
