import { useEffect, useState } from 'react';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';
import { createApiRoute } from '@/utils/createApiRoute';
import { SERVER_ROUTES } from '@/routes';
import toast from 'react-hot-toast';
import type { Question } from '@/types';

export const useLoadQuestions = () => {
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const { loading, setLoading } = useDelayedLoading();

    const loadQuestions = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                createApiRoute(SERVER_ROUTES.QUESTIONS),
            );
            const body = await response.json();
            setAllQuestions(body.data);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while fetching the questions');
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
