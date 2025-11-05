import { useForm } from 'react-hook-form';
import { useAuthService } from '../../hooks/useAuthService';
import { ErrorMessage } from './ErrorMessage';

type LogoutScope = 'thisDevice' | 'allDevices';

interface FormValues {
    logoutScope: LogoutScope;
}

const cards: { labelText: string; value: LogoutScope }[] = [
    { labelText: 'Log me out from this device', value: 'thisDevice' },
    { labelText: 'Log me out from all devices', value: 'allDevices' },
];

export const LogoutForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const { logOut } = useAuthService();

    const onSubmit = async ({ logoutScope }: FormValues) =>
        await logOut(logoutScope);

    const errorMessage=errors.logoutScope?.message

    return (
        <div className="bg-gray-700 p-4 w-full">
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
                            className={`bg-white text-gray-700 flex flex-col items-center p-2 rounded cursor-pointer ${errorMessage && 'border-2 border-red-400'}`}
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

                <ErrorMessage errorMessage={errors.logoutScope?.message} className=' text-center'/>

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
