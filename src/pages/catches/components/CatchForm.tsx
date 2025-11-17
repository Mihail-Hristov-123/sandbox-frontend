import { useForm, type Resolver } from 'react-hook-form';
import { LabelledInput } from '@/components/formRelated/LabelledInput';
import { Draggable, Map, Marker, ZoomControl } from 'pigeon-maps';
import { useState } from 'react';
import { CurrentLocationButton } from '@/components/maps/CurrentLocationButton';
import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { CLIENT_ROUTES } from '@/routes';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { CatchSchema, type CatchValues } from '@/schemas/CatchSchema';

import { ErrorMessage } from '@/components/formRelated/ErrorMessage';
import { useCreateCatch } from '../hooks/useCreateCatch';
import { SubmitButton } from '@/components/SubmitButton';

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
        if (!success) return;
        reset();
    };

    const [anchor, setAnchor] = useState<[number, number]>([
        getValues('latitude') ?? 50.879,
        getValues('longitude') ?? 4.6997,
    ]);

    const { isLoggedIn } = useAuthContext();

    const updateCoordinates = (coordinates: [number, number]) => {
        const [lat, lng] = coordinates;
        setValue('latitude', lat, {
            shouldValidate: true,
        });
        setValue('longitude', lng, {
            shouldValidate: true,
        });

        setAnchor(coordinates);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form border-0 shadow-xl py-8 px-6 gap-8"
        >
            {isLoggedIn ? (
                <>
                    <LabelledInput
                        labelText="Title:"
                        register={register}
                        errors={errors}
                        name="title"
                    />
                    <LabelledInput
                        labelText="Image link:"
                        register={register}
                        errors={errors}
                        name="imgLink"
                    />
                    <Map
                        height={300}
                        center={anchor}
                        defaultCenter={anchor}
                        minZoom={4}
                        defaultZoom={11}
                    >
                        <ZoomControl />
                        <Draggable
                            anchor={anchor}
                            onDragEnd={updateCoordinates}
                        >
                            <Marker />
                        </Draggable>
                        <CurrentLocationButton
                            setCurrentPosition={updateCoordinates}
                        />
                    </Map>
                    <ErrorMessage
                        errorMessage={
                            (errors.latitude?.message ||
                                errors.longitude?.message) &&
                            'Catch coordinates are required'
                        }
                    />

                    <SubmitButton text="Publish catch" />
                </>
            ) : (
                <p>
                    <Link to={CLIENT_ROUTES.LOG_IN}>Log in</Link> to share your
                    catch
                </p>
            )}
        </form>
    );
};
