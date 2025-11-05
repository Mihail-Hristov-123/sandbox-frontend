import { useForm } from 'react-hook-form';

import type { HTMLInputTypeAttribute } from 'react';
import {
    RegisterSchema,
    type UserRegisterValues,
} from '../schemas/auth/RegisterSchema';
import { LabelledInput } from '../components/formRelated/LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthService } from '../hooks/useAuthService';
import { Link } from 'react-router';
import { clientRoutes } from '../routes';

const inputFields: {
    type: HTMLInputTypeAttribute;
    labelText: string;
    name: keyof UserRegisterValues;
}[] = [
    {
        labelText: 'Username:',
        type: 'text',
        name: 'username',
    },
    {
        labelText: 'Email:',
        type: 'email',
        name: 'email',
    },
    {
        labelText: 'Password:',
        type: 'password',
        name: 'password',
    },
    {
        labelText: 'Confirm password:',
        type: 'password',
        name: 'confirmedPassword',
    },
];

export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterValues>({
        resolver: zodResolver(RegisterSchema),
    });

    const { register: createAccount } = useAuthService();
    const onSubmit = async (data: UserRegisterValues) =>
        await createAccount(data);

    return (
        <main className=" h-screen flex items-center justify-center flex-col gap-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="  flex flex-col justify-around rounded-3xl items-center gap-8 bg-gray-700 text-white px-6 py-4 min-w-1/3   "
            >
                <h1 className="text-center text-3xl">Create account</h1>

                {inputFields.map((field) => (
                    <LabelledInput
                        key={field.name}
                        register={register}
                        errors={errors}
                        {...field}
                        autoComplete="off"
                    />
                ))}
                <input
                    type="submit"
                    className=" bg-white text-gray-700 w-fit self-center py-1 px-2 rounded-2xl"
                />
            </form>
            <p>
                Already have an account?{' '}
                <Link
                    to={clientRoutes.LOG_IN}
                    className=" bg-gray-700 text-white p-2 rounded-3xl"
                >
                    Log in
                </Link>
            </p>
        </main>
    );
};
