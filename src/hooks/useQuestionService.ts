import toast from 'react-hot-toast';
import type {
    QuestionReturnValue,
    QuestionValues,
} from '../schemas/questions/QuestionSchema';
import { useApi } from './useApi';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '../contexts/loading/useLoadingContext';

export const useQuestionService = () => {
    const { fetchWithAuthCheck } = useApi();

    const { setIsLoading } = useLoadingContext();

    const [allQuestions, setAllQuestions] = useState<
        QuestionReturnValue[] | null
    >(null);

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
            await updateQuestions();
            return;
        }
    };

    const getAllQuestions = async () => {
        const result = await fetchWithAuthCheck<QuestionReturnValue[]>({
            path: 'QUESTIONS',
        });
        if (result?.ok) {
            return result.data;
        }
    };

    const updateQuestions = async () => {
        setIsLoading(true);
        const allQuestions = await getAllQuestions();
        setAllQuestions(allQuestions ?? []);
        setIsLoading(false);
    };

    useEffect(() => {
        updateQuestions();
    }, []);

    return { createQuestion, allQuestions };
};
