import z from 'zod';

export const QuestionSchema = z.object({
    title: z
        .string()
        .min(10, 'Question title must be at least 10 characters long')
        .max(50, 'Question title must not be longer than 50 characters'),
    description: z
        .string()
        .min(20, 'Question description must be at least 10 characters long')
        .max(200, 'Question description must not be longer than 50 characters'),
});

export type QuestionValues = z.infer<typeof QuestionSchema>;
export type QuestionReturnValue = QuestionValues & {
    authorID: number;
    authorName: string;
};
