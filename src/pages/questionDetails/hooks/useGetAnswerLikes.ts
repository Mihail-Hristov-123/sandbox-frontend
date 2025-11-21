import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useEffect, useState } from 'react';

interface AnswerLike {
    id: number;
    user_id: number;
    answer_id: number;
}

export const useGetAnswerLikes = (answerId: number) => {
    const [answerLikes, setAnswerLikes] = useState<AnswerLike[] | null>();
    const { userInfo } = useAuthContext();
    const updateAnswerLikes = async () => {
        const response = await fetch(
            `${createApiRoute(SERVER_ROUTES.LIKES)}/answers/${answerId}`,
        );
        const body = await response.json();
        setAnswerLikes(body.data);
    };

    useEffect(() => {
        updateAnswerLikes();
    }, []);

    const likesCount = answerLikes?.length || 0;
    const likedByCurrentUser = answerLikes?.some(
        (like) => like.user_id === userInfo?.id,
    );

    return { likedByCurrentUser, likesCount, updateAnswerLikes };
};
