import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import type { QuestionReturnValue } from '@/schemas/questions/QuestionSchema';
import type { AnswerReturnValues } from '@/schemas/questions/AnswerSchema';

export interface DetailedQuestionInfo {
    questionData: QuestionReturnValue;
    answersData: AnswerReturnValues[];
}

export const useLoadQuestionDetails = (questionId: unknown) => {
    const { fetchWithAuthCheck } = useApi();

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

        const response = await fetchWithAuthCheck<DetailedQuestionInfo>({
            path: 'QUESTIONS',
            id: Number(questionId),
            silent: true,
        });

        setCurrentQuestionData(response?.data ?? null);
        setIsLoading(false);
    };

    useEffect(() => {
        updateCurrentQuestionData();
    }, []);

    return { currentQuestionData, updateCurrentQuestionData, isLoading };
};
