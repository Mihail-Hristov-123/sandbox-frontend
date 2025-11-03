import { useForm } from 'react-hook-form';

import type { HTMLInputTypeAttribute } from 'react';
import {
    RegisterSchema,
    type UserRegisterValues,
} from '../schemas/auth/RegisterSchema';
import { LabelledInput } from '../components/LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthService } from '../hooks/useAuthService';

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
        <main className=" h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="  flex flex-col justify-around rounded-3xl items-center bg-gray-700 text-white px-6 py-4 min-w-1/3 min-h-1/2   "
            >
                <header>
                    <h1 className="text-center text-3xl">Create account</h1>
                </header>
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
        </main>
    );
};
