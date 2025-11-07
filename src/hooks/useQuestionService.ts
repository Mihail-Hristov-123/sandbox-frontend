import toast from 'react-hot-toast';
import type {
    QuestionReturnValue,
    QuestionValues,
} from '../schemas/questions/QuestionSchema';
import { useApi } from './useApi';
import { useEffect, useState } from 'react';

export const useQuestionService = () => {
    const { fetchWithAuthCheck } = useApi();

    const [allQuestions, setAllQuestions] = useState<
        QuestionReturnValue[] | null
    >();

    const createQuestion = async (
        data: QuestionValues,
        resetForm: () => void,
    ) => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            body: data,
            path: 'QUESTIONS',
        });
        if (result && result.ok) {
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
        if (result && result.ok) {
            return result.body.data;
        }
    };

    const updateQuestions = async () => {
        const allQuestions = await getAllQuestions();
        setAllQuestions(allQuestions);
    };

    useEffect(() => {
        updateQuestions();
    }, []);

    return { createQuestion, allQuestions };
};
