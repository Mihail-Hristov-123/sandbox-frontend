import type {
    AnswerValues,
    CatchValues,
    QuestionValues,
    RegisterValues,
} from 'tacklebox-schemas';

type WithAuthorAndId<T> = T & {
    id: number;
    user_id: number;
    user_username: string;
    profile_pic_url: string | null;
};

export type User = Pick<RegisterValues, 'email' | 'username'> & {
    id: number;
    profile_pic_url: string | null;
};

export type Answer = WithAuthorAndId<AnswerValues> & { question_id: number };

export type Question = WithAuthorAndId<QuestionValues>;

export type Catch = WithAuthorAndId<CatchValues> & { catch_pic_url: string };
