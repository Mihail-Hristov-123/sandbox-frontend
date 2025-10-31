import { useForm } from 'react-hook-form';
import { LabelledInput } from '../components/LabelledInput';
import { LoginSchema, type UserLoginValues } from '../schemas/auth/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthService } from '../hooks/useAuthService';

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const { login } = useAuthService();

    const onSubmit = async (data: UserLoginValues) => {
        await login(data);
    };

    return (
        <main className=" h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" bg-gray-700 text-white  flex flex-col justify-around size-1/3 p-6 rounded-3xl"
            >
                <header>
                    <h1 className=" text-center text-3xl">Log in</h1>
                </header>
                <LabelledInput
                    labelText="Email:"
                    errors={errors}
                    name="email"
                    register={register}
                />
                <LabelledInput
                    labelText="Password:"
                    errors={errors}
                    name="password"
                    type="password"
                    autoComplete="off"
                    register={register}
                />
                <input
                    type="submit"
                    className=" bg-white text-gray-700 w-fit self-center py-1 px-2 rounded-2xl"
                />
            </form>
        </main>
    );
};
