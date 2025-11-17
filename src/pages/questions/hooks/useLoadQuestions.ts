import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import type { QuestionReturnValue } from '@/schemas/questions/QuestionSchema';

export const useLoadQuestions = () => {
    const { fetchWithAuthCheck } = useApi();

    const [allQuestions, setAllQuestions] = useState<QuestionReturnValue[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

    const loadQuestions = async () => {
        setIsLoadingQuestions(true);

        const response = await fetchWithAuthCheck<QuestionReturnValue[]>({
            path: 'QUESTIONS',
        });

        setTimeout(() => {
            setAllQuestions(response?.data || []);
            setIsLoadingQuestions(false);
        }, 500);
    };

    useEffect(() => {
        loadQuestions();
    }, []);
    return {
        allQuestions,
        isLoadingQuestions,
        loadQuestions,
    };
};
