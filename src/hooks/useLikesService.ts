import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useNavigate } from 'react-router';
import { useApi } from './useApi';
import { CLIENT_ROUTES, SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type LikeableEntity = 'answers' | 'catches';

interface LikeData {
    id: number;
    user_id: number;
}

export const useLikesService = (entity: LikeableEntity, entityId: number) => {
    const [likes, setLikes] = useState<null | LikeData[]>(null);
    const { userInfo, isLoggedIn } = useAuthContext();
    const { fetchWithAuthCheck } = useApi();
    const navigate = useNavigate();

    const updateLikes = async () => {
        const response = await fetch(
            `${createApiRoute(SERVER_ROUTES.LIKES)}/${entity}/${entityId}`,
        );

        const body = await response.json();

        setLikes(body.data ?? null);
    };

    useEffect(() => {
        updateLikes();
    }, []);

    const likeOrDislike = async () => {
        if (!isLoggedIn) {
            navigate(CLIENT_ROUTES.LOG_IN);
            return;
        }
        try {
            await fetchWithAuthCheck(
                `${createApiRoute(SERVER_ROUTES.LIKES)}/${entity}/${entityId}`,
                { method: 'POST' },
            );
            await updateLikes();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong while updating your reaction');
        }
    };

    const likesCount = likes?.length ?? 0;
    const likedByUser = likes?.some((like) => like.user_id === userInfo?.id);

    return { likesCount, likedByUser, likeOrDislike };
};
