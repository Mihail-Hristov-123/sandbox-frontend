import { useForm, type Resolver } from 'react-hook-form';
import { LabelledInput } from '@/components/formRelated/LabelledInput';

import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { CLIENT_ROUTES } from '@/routes';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { CatchSchema, type CatchValues } from '@/schemas/CatchSchema';

import { useCreateCatch } from '../hooks/useCreateCatch';
import { SubmitButton } from '@/components/SubmitButton';
import { CoordinateSelection } from './maps/CoordinateSelection';

export const CatchForm = ({
    updateCatches,
}: {
    updateCatches: () => Promise<void>;
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        getValues,
    } = useForm<CatchValues>({
        resolver: zodResolver(CatchSchema) as Resolver<CatchValues>,
    });

    const { createCatch } = useCreateCatch(updateCatches);

    const onSubmit = async (data: CatchValues) => {
        const success = await createCatch(data);
        if (success) reset();
    };

    const { isLoggedIn } = useAuthContext();

    return (
        <div className="shadow-xl py-8 px-6 rounded-big">
            {isLoggedIn ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form border-0  gap-8"
                >
                    <div className="input-container max-md:px-2 pb-0">
                        <LabelledInput
                            labelText="Title:"
                            register={register}
                            errors={errors}
                            name="title"
                        />

                        <CoordinateSelection
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                        />

                        <SubmitButton text="Publish catch" />
                    </div>
                </form>
            ) : (
                <p className="text-center text-xl">
                    <Link to={CLIENT_ROUTES.LOG_IN}>Log in</Link> to share your
                    catch
                </p>
            )}
        </div>
    );
};
