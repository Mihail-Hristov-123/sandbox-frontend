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

export interface DetailedQuestionInfo {
    questionData: {
        authorName: string;
        description: string;
        title: string;
    };
    answersData: [
        {
            question_id: number;
            id: number;
            content: string;
        },
    ];
}
export const useQuestionService = () => {
    const { fetchWithAuthCheck } = useApi();

    const { setIsLoading } = useLoadingContext();

    const [allQuestions, setAllQuestions] = useState<
        QuestionReturnValue[] | null
    >(null);

    const [currentQuestion, setCurrentQuestion] =
        useState<DetailedQuestionInfo | null>(null);

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

    const updateCurrentQuestion = async (id: number) => {
        setIsLoading(true);
        const question = await getQuestionWithAnswers(id);
        setCurrentQuestion(question);
        setIsLoading(false);
        return question;
    };

    useEffect(() => {
        updateQuestions();
    }, []);

    const getQuestionWithAnswers = async (id: number) => {
        setIsLoading(true);
        const result = await fetchWithAuthCheck<DetailedQuestionInfo>({
            path: `questions/${id}`,
        });

        setIsLoading(false);
        return result?.data ?? null;
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
            await updateCurrentQuestion(id);
            onSuccess();
        }
    };

    return {
        createQuestion,
        allQuestions,
        updateCurrentQuestion,
        currentQuestion,
        createAnswer,
    };
};
