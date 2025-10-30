import { useForm } from 'react-hook-form';

import type { HTMLInputTypeAttribute } from 'react';
import {
    RegisterSchema,
    type UserRegisterValues,
} from '../schemas/auth/RegisterSchema';
import { LabelledInput } from '../components/LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';

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
    const onSubmit = (data: UserRegisterValues) => {
        console.log('Register Data:', data);
    };

    return (
        <main>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                }}
                className="  flex justify-center items-center  h-[98vh]"
            >
                <div className="w-1/3 bg-gray-700 rounded-3xl text-white flex flex-col gap-6 px-8 py-8">
                    <header>
                        <h1 className="text-center text-3xl">Create account</h1>
                    </header>
                    {inputFields.map((field) => (
                        <LabelledInput
                            key={field.name}
                            register={register}
                            errors={errors}
                            {...field}
                        />
                    ))}
                    <input
                        type="submit"
                        className=" bg-white text-gray-700 w-fit self-center py-1 px-2 rounded-2xl"
                    />
                </div>
            </form>
        </main>
    );
};
