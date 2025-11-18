import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import type { QuestionReturnValue } from '@/schemas/questions/QuestionSchema';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';
import { createApiRoute } from '@/utils/createApiRoute';
import { SERVER_ROUTES } from '@/routes';
import toast from 'react-hot-toast';

export const useLoadQuestions = () => {
    const { fetchWithAuthCheck } = useApi();

    const [allQuestions, setAllQuestions] = useState<QuestionReturnValue[]>([]);
    const { loading, setLoading } = useDelayedLoading();

    const loadQuestions = async () => {
        setLoading(true);

        try {
            const response = await fetchWithAuthCheck(
                createApiRoute(SERVER_ROUTES.QUESTIONS),
            );
            const body = await response.json();
            setAllQuestions(body.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch the existing questions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);
    return {
        allQuestions,
        loading,
        loadQuestions,
    };
};
