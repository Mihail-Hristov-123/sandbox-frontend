import z from 'zod';

export const CatchSchema = z.object({
    title: z
        .string()
        .min(10, 'Title must be a least 10 characters long')
        .max(50, 'Title cannot be longer than 50 characters'),
    latitude: z.coerce
        .number()
        .min(-90, 'Invalid latitude')
        .max(90, 'Invalid latitude'),
    longitude: z.coerce
        .number()
        .min(-180, 'Invalid longitude')
        .max(180, 'Invalid longitude'),

    imgLink: z.url('Invalid image URL'),
});

export type CatchValues = z.infer<typeof CatchSchema>;

export type CatchInsertValues = CatchValues & { user_id: number };

export type CatchReturnValues = CatchInsertValues & {
    id: number;
    user_id: number;
    user_username: string;
};
