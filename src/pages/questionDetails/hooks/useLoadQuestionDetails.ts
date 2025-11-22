import { useEffect, useState } from 'react';

import type { QuestionReturnValue } from '@/schemas/questions/QuestionSchema';

import { SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import toast from 'react-hot-toast';
import type { Answer } from '@/types';

export interface DetailedQuestionInfo {
    questionData: QuestionReturnValue;
    answersData: Answer[];
}

export const useLoadQuestionDetails = (questionId: unknown) => {
    const [currentQuestionData, setCurrentQuestionData] =
        useState<DetailedQuestionInfo | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const updateCurrentQuestionData = async () => {
        setIsLoading(true);
        if (isNaN(Number(questionId)) || Number(questionId) <= 0) {
            setCurrentQuestionData(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(
                createApiRoute(`${SERVER_ROUTES.QUESTIONS}/${questionId}`),
            );
            const body = await response.json();
            setCurrentQuestionData(body.data || null);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch question details');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        updateCurrentQuestionData();
    }, []);

    return { currentQuestionData, updateCurrentQuestionData, isLoading };
};
