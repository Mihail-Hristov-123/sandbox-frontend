import type {
    AnswerValues,
    QuestionValues,
    RegisterValues,
} from 'tacklebox-schemas';

export type User = Pick<RegisterValues, 'email' | 'username'> & {
    id: number;
    profile_pic_url: string | null;
};

export type Answer = AnswerValues & {
    id: number;
    user_id: number;
    user_username: string;
    question_id: number;
    profile_pic_url: string | null;
};

export type Question = QuestionValues & {
    id: number;
    user_id: number;
    user_username: string;
    profile_pic_url: string | null;
};
