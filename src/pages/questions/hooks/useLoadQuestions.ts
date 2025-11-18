import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import type { QuestionReturnValue } from '@/schemas/questions/QuestionSchema';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';

export const useLoadQuestions = () => {
    const { fetchWithAuthCheck } = useApi();

    const [allQuestions, setAllQuestions] = useState<QuestionReturnValue[]>([]);
    const { loading, setLoading } = useDelayedLoading();

    const loadQuestions = async () => {
        setLoading(true);

        const response = await fetchWithAuthCheck<QuestionReturnValue[]>({
            path: 'QUESTIONS',
        });

        setTimeout(() => {
            setAllQuestions(response?.data || []);
            setLoading(false);
        }, 500);
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
