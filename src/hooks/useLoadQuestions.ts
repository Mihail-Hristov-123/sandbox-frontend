import type { QuestionReturnValue } from '../schemas/questions/QuestionSchema';
import { useApi } from './useApi';
import { useEffect, useState } from 'react';

export const useLoadQuestions = () => {
    const { fetchWithAuthCheck } = useApi();

    const [allQuestions, setAllQuestions] = useState<QuestionReturnValue[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

    // const createQuestion = async (
    //     data: QuestionValues,
    //     resetForm: () => void,
    // ) => {
    //     const result = await fetchWithAuthCheck({
    //         method: 'POST',
    //         body: data,
    //         path: 'QUESTIONS',
    //     });
    //     if (result?.ok) {
    //         toast.success('Question published!');
    //         resetForm();
    //     }
    // };

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
