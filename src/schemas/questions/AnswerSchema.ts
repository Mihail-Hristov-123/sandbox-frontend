import z from 'zod';

export const AnswerSchema = z.object({
    content: z
        .string()
        .trim()
        .min(10, 'Answer must be at least 10 characters long')
        .max(300, 'Answer must not be longer than 300 characters'),
});

export type AnswerValues = z.infer<typeof AnswerSchema>;

export type AnswerReturnValues = AnswerValues & {
    id: number;
    user_id: number;
    user_username: string;
    question_id: number;
    profile_pic_url: string;
};
