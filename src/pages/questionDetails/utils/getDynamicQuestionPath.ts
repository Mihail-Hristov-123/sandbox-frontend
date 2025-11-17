import { SERVER_ROUTES } from '@/routes';

export const getDynamicQuestionPath = (questionId: number | string) =>
    `${SERVER_ROUTES.QUESTIONS}/${questionId}`;
