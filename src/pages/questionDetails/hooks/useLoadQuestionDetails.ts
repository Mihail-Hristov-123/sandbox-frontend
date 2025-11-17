import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { getDynamicQuestionPath } from '../utils/getDynamicQuestionPath';

export interface DetailedQuestionInfo {
    questionData: {
        user_username: string;
        user_id: number;
        description: string;
        title: string;
    };
    answersData: {
        question_id: number;
        id: number;
        content: string;
        user_id: number;
        user_username: string;
    }[];
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
            path: getDynamicQuestionPath(questionId as number),
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
