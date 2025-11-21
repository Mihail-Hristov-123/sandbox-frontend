import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useEffect, useState } from 'react';

interface LikeData {
    id: number;
    user_id: number;
}

type LikeableEntity = 'answers' | 'catches';

export const useGetLikes = (entity: LikeableEntity, entityId: number) => {
    const [likes, setLikes] = useState<null | LikeData[]>(null);
    const { userInfo } = useAuthContext();

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

    const likesCount = likes?.length ?? 0;
    const likedByUser = likes?.some((like) => like.user_id === userInfo?.id);

    return { likesCount, likedByUser, updateLikes };
};
