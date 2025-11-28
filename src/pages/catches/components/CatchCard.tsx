import { AuthorField } from '@/components/AuthorField';
import { LocationPreview } from '@/pages/catches/components/maps/LocationPreview';
import { useState } from 'react';
import { LikeButton } from '@/components/buttons/LikeButton';
import { useLikesService } from '@/hooks/useLikesService';
import type { Catch } from '@/types';
import { DeleteButton } from '@/components/buttons/DeleteButton';
import { useCheckIsOwner } from '@/hooks/useCheckIsOwner';
import { useDeleteResource } from '@/hooks/useDeleteResource';

export const CatchCard = ({
    info: {
        id,
        user_id,
        profile_pic_url,
        user_username,
        title,
        catch_pic_url,
        latitude,
        longitude,
    },
    updateCatches,
}: {
    info: Catch;
    updateCatches: () => Promise<void>;
}) => {
    const [locationDisplayed, setLocationDisplayed] = useState(false);

    const { likedByUser, likesCount, likeOrDislike } = useLikesService(
        'catches',
        id,
    );
    const isOwner = useCheckIsOwner(user_id);
    const { deleteResource: deleteCatch } = useDeleteResource(
        'catch',
        id,
        updateCatches,
    );

    return (
        <article className="w-fit shadow-2xl rounded-big p-4 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-6">
                {' '}
                <AuthorField
                    userId={user_id}
                    name={user_username}
                    profilePictureLink={profile_pic_url}
                />
                {isOwner ? (
                    <DeleteButton deleteResource={deleteCatch} />
                ) : (
                    <LikeButton
                        likedByUser={likedByUser}
                        likesCount={likesCount}
                        handleLike={likeOrDislike}
                    />
                )}
            </div>

            <h2 className="text-xl font-semibold">{title}</h2>

            <img
                src={catch_pic_url}
                alt="Fish photo"
                className="rounded-md object-contain max-h-[75vh]"
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
