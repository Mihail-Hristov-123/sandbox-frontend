import { useForm } from 'react-hook-form';
import { LabelledInput } from '../components/formRelated/LabelledInput';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthService } from '../hooks/useAuthService';
import { Link } from 'react-router';
import { CLIENT_ROUTES } from '../routes';
import { SubmitButton } from '@/components/SubmitButton';
import { LoginSchema, type LoginValues } from 'tacklebox-schemas';

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const { logIn } = useAuthService();

    const onSubmit = async (data: LoginValues) => await logIn(data);
    return (
        <main className="flex flex-col items-center justify-center gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="form pb-6">
                <h1>Log in</h1>

                <div className="input-container">
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
                </div>

                <SubmitButton text="Sign in" />
            </form>
            <p>
                Don't have an account?{' '}
                <Link to={CLIENT_ROUTES.REGISTER}>Register</Link>
            </p>
        </main>
    );
};
