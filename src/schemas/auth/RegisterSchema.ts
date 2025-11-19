import z from 'zod';
import { LoginSchema } from './LoginSchema';

export const RegisterSchema = LoginSchema.extend({
    username: z
        .string()
        .min(6, { message: 'Username must be at least 6 characters long' })
        .max(20, { message: 'Username must be 20 characters long at most' }),
    confirmedPassword: z.string(),
}).refine((data) => data.confirmedPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmedPassword'],
});

export type UserRegisterValues = z.infer<typeof RegisterSchema>;

export type UserReturnValues = Pick<
    UserRegisterValues,
    'email' | 'username'
> & {
    id: number;
    profile_pic_url: string | null;
};
