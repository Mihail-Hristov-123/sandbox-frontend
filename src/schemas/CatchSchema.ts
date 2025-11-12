import z from 'zod';

export interface CatchValues {
    authorName: string;
    title: string;
    coordinates: [latitude: number, longitude: number];
    imgLink: string;
}

export const CatchSchema = z.object({
    title: z
        .string()
        .min(10, 'Title must be a least 10 characters long')
        .max(50, 'Title cannot be longer than 50 characters'),
    coordinates: z.tuple(
        [
            z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude'),
            z
                .number()
                .min(-180, 'Invalid longitude')
                .max(180, 'Invalid longitude'),
        ],
        'Catch coordinates must be provided',
    ),
    imgLink: z.url('Invalid image URL'),
});
