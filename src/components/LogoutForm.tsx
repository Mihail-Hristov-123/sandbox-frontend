import { useForm } from 'react-hook-form';

import { useAuthService } from '../hooks/useAuthService';

export type LogoutPath = 'logout' | 'logout-all';

interface FormValues {
    logoutScope: LogoutPath;
}

const cards: { labelText: string; value: LogoutPath }[] = [
    { labelText: 'Log me out from this device', value: 'logout' },
    { labelText: 'Log me out from all devices', value: 'logout-all' },
];

export const LogoutForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const { logout } = useAuthService();

    const onSubmit = async (data: FormValues) => {
        await logout(data.logoutScope);
    };

    return (
        <div className="bg-gray-700 p-4 rounded-md">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-white flex flex-col space-y-4"
            >
                <header>
                    <h3 className="text-center text-2xl font-semibold">
                        Need a break?
                    </h3>
                </header>

                <div className="flex justify-around">
                    {cards.map(({ value, labelText }) => (
                        <label
                            className="bg-white text-gray-700 flex flex-col items-center p-2 rounded cursor-pointer"
                            key={value}
                        >
                            {labelText}
                            <input
                                type="radio"
                                value={value}
                                {...register('logoutScope', {
                                    required: 'Please select one option.',
                                })}
                            />
                        </label>
                    ))}
                </div>

                {errors.logoutScope && (
                    <p className="text-red-400 text-center">
                        {errors.logoutScope.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded self-center"
                >
                    Log me out
                </button>
            </form>
        </div>
    );
};
