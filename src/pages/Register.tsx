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
import { CLIENT_ROUTES } from '../routes';
import { SubmitButton } from '@/components/SubmitButton';

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
        <main className=" flex items-center justify-center pt-10 flex-col gap-8 ">
            <form onSubmit={handleSubmit(onSubmit)} className="form pb-6">
                <h1>Create account</h1>
                <div className=" input-container">
                    {inputFields.map((field) => (
                        <LabelledInput
                            key={field.name}
                            register={register}
                            errors={errors}
                            {...field}
                            autoComplete="off"
                        />
                    ))}
                </div>

                <SubmitButton text="Register" />
            </form>
            <p>
                Already have an account?{' '}
                <Link to={CLIENT_ROUTES.LOG_IN}>Log in</Link>
            </p>
        </main>
    );
};
