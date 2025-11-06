import { useForm } from 'react-hook-form';
import { LabelledInput } from '../components/formRelated/LabelledInput';
import { LoginSchema, type UserLoginValues } from '../schemas/auth/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthService } from '../hooks/useAuthService';
import { Link } from 'react-router';
import { clientRoutes } from '../routes';

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const { logIn } = useAuthService();

    const onSubmit = async (data: UserLoginValues) => await logIn(data);
    return (
        <main className="flex flex-col items-center justify-center gap-8 px-8">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1>Log in</h1>

                <div className=" input-container">
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

                <input type="submit" />
            </form>
            <p>
                Don't have an account?{' '}
                <Link to={clientRoutes.REGISTER}>Register</Link>
            </p>
        </main>
    );
};
