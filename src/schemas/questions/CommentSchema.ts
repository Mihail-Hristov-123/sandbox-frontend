import z from 'zod';

export const CommentSchema = z.object({
    content: z
        .string()
        .min(5, 'Comment must be at least 5 characters long')
        .max(200, 'Comment must not be longer than 200 characters'),
});

export type CommentValues = z.infer<typeof CommentSchema>;
