import { CatchSchema } from 'tacklebox-schemas';
import z from 'zod';

export const CatchWithImageSchema = CatchSchema.extend({
    image: z.file('Image is required'),
});

export type CatchWithImage = z.infer<typeof CatchWithImageSchema>;
