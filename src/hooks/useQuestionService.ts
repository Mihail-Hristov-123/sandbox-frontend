import toast from 'react-hot-toast';
import type {
    QuestionReturnValue,
    QuestionValues,
} from '../schemas/questions/QuestionSchema';
import { useApi } from './useApi';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '../contexts/loading/useLoadingContext';
import {
    type AnswerReturnValues,
    type AnswerValues,
} from '../schemas/questions/CommentSchema';

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

    const getQuestionWithAnswers = async (id: number) => {
        setIsLoading(true);
        const data = await fetchWithAuthCheck({ path: `questions/${id}` });
        console.log(data);
        setIsLoading(false);
        return data;
    };

    const createAnswer = async (
        data: AnswerValues,
        id: number,
        onSuccess: () => void,
    ) => {
        const result = await fetchWithAuthCheck<AnswerReturnValues>({
            path: `questions/${id}`,
            body: data,
            method: 'POST',
        });
        if (result?.ok) {
            toast.success('Answer published');
            onSuccess();
        }
    };

    return {
        createQuestion,
        allQuestions,
        getQuestionWithAnswers,
        createAnswer,
    };
};
