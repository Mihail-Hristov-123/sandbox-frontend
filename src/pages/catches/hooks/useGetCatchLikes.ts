import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useEffect, useState } from 'react';

interface CatchLike {
    id: number;
    user_id: number;
    catch_id: number;
}

export const useGetCatchLikes = (catchId: number) => {
    const [catchLikes, setCatchLikes] = useState<null | CatchLike[]>(null);
    const { userInfo } = useAuthContext();

    const loadCatchLikes = async () => {
        const response = await fetch(
            `${createApiRoute(SERVER_ROUTES.LIKES)}/catches/${catchId}`,
        );

        const body = await response.json();

        setCatchLikes(body.data ?? null);
    };

    useEffect(() => {
        loadCatchLikes();
    }, []);

    const likesCount = catchLikes?.length ?? 0;
    const likedByUser = catchLikes?.some(
        (like) => like.user_id === userInfo?.id,
    );

    return { likesCount, likedByUser, loadCatchLikes };
};
