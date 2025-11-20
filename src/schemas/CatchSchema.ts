import z from 'zod';

const INVALID_LONGITUDE_MESSAGE = 'Invalid longitude';

const INVALID_LATITUDE_MESSAGE = 'Invalid latitude';

export const CatchSchema = z.object({
    title: z
        .string()
        .min(10, 'Title must be a least 10 characters long')
        .max(50, 'Title cannot be longer than 50 characters'),
    latitude: z.coerce
        .number('Latitude is required')
        .min(-90, INVALID_LATITUDE_MESSAGE)
        .max(90, INVALID_LATITUDE_MESSAGE),
    longitude: z.coerce
        .number('Longitude is required')
        .min(-180, INVALID_LONGITUDE_MESSAGE)
        .max(180, INVALID_LONGITUDE_MESSAGE),

    image: z.file('Image is required'),
});

export type CatchValues = z.infer<typeof CatchSchema>;

export type CatchReturnValues = Omit<CatchValues, 'image'> & {
    id: number;
    user_username: string;
    user_id: number;
    profile_pic_url: string;
    catch_pic_url: string;
};
