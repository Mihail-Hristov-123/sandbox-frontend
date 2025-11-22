import { Controller, useForm, type Resolver } from 'react-hook-form';
import { LabelledInput } from '@/components/formRelated/LabelledInput';

import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { CLIENT_ROUTES } from '@/routes';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateCatch } from '../hooks/useCreateCatch';
import { SubmitButton } from '@/components/SubmitButton';
import { CoordinateSelection } from './maps/CoordinateSelection';
import { PictureInput } from '@/components/formRelated/PictureInput';
import { type CatchValues } from 'tacklebox-schemas';

import {
    CatchWithImageSchema,
    type CatchWithImage,
} from '../schemas/CatchWithImageSchema';

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
        control,
        getValues,
    } = useForm<CatchWithImage>({
        resolver: zodResolver(CatchWithImageSchema) as Resolver<CatchWithImage>,
    });

    const { createCatch, loading } = useCreateCatch(updateCatches);
    const { isLoggedIn } = useAuthContext();

    const onSubmit = async (data: CatchWithImage) => {
        const success = await createCatch(data);
        if (success) reset();
    };

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
                        <Controller
                            name="image"
                            control={control}
                            render={({ field, fieldState }) => (
                                <PictureInput
                                    image={field.value}
                                    setImage={(file: File | null) =>
                                        field.onChange(file)
                                    }
                                    error={fieldState.error?.message}
                                    instructions="Upload fish image"
                                    imageClassName="w-full rounded-small"
                                />
                            )}
                        />

                        <CoordinateSelection
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                        />

                        <SubmitButton disabled={loading} text="Publish catch" />
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
