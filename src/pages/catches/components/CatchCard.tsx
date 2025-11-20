import { AuthorField } from '@/components/AuthorField';
import { LocationPreview } from '@/pages/catches/components/maps/LocationPreview';
import type { CatchReturnValues } from '@/schemas/CatchSchema';
import { useState } from 'react';
import { useGetCatchLikes } from '../hooks/useGetCatchLikes';
import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useNavigate } from 'react-router';
import { CLIENT_ROUTES } from '@/routes';
import { useLikeCatch } from '../hooks/useLikeCatch';

export const CatchCard = ({
    user_username,
    title,
    latitude,
    longitude,
    catch_pic_url,
    profile_pic_url,
    id,
}: CatchReturnValues) => {
    const [locationDisplayed, setLocationDisplayed] = useState(false);
    const { likesCount, likedByUser, loadCatchLikes } = useGetCatchLikes(id);
    const { likeOrDislike } = useLikeCatch(id);

    const handleLike = async () => {
        await likeOrDislike();
        await loadCatchLikes();
    };

    return (
        <article className="w-full shadow-2xl rounded-big p-4 space-y-4">
            <div>
                {' '}
                <AuthorField
                    name={user_username}
                    profilePictureLink={profile_pic_url}
                />
                <p>{likesCount} likes</p>
                <button onClick={handleLike}>
                    {likedByUser ? 'Unlike' : 'Like'}
                </button>
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
