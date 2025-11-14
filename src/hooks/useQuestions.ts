import toast from 'react-hot-toast';
import type {
    QuestionReturnValue,
    QuestionValues,
} from '../schemas/questions/QuestionSchema';
import { useApi } from './useApi';
import { useEffect, useState } from 'react';

export const useQuestions = () => {
    const { fetchWithAuthCheck } = useApi();

    const [allQuestions, setAllQuestions] = useState<
        QuestionReturnValue[] | null
    >(null);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

    const createQuestion = async (
        data: QuestionValues,
        resetForm: () => void,
    ) => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            body: data,
            path: 'QUESTIONS',
        });
        if (result?.ok) {
            toast.success('Question published!');
            resetForm();
        }
    };

    const updateQuestions = () => {
        setIsLoadingQuestions(true);

        fetchWithAuthCheck<QuestionReturnValue[]>({
            path: 'QUESTIONS',
        }).then((result) => {
            setTimeout(() => {
                setAllQuestions(result?.data || null);
                setIsLoadingQuestions(false);
            }, 1000);
        });
    };

    useEffect(() => updateQuestions(), []);
    return {
        createQuestion,

        allQuestions,
        isLoadingQuestions,
        updateQuestions,
    };
};
