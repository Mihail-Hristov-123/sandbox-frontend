import { useForm } from 'react-hook-form';
import { type CatchValues } from '../cards/CatchCard';
import { LabelledInput } from './LabelledInput';
import { Draggable, Map, Marker, ZoomControl } from 'pigeon-maps';

import { useState } from 'react';
import { CurrentLocationButton } from '../maps/CurrentLocationButton';
import { useAuthContext } from '../../contexts/auth/useAuthContext';
import { clientRoutes } from '../../routes';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { CatchSchema } from '../../schemas/CatchSchema';
import toast from 'react-hot-toast';
import { ErrorMessage } from './ErrorMessage';

type FormData = Omit<CatchValues, 'authorName'>;

export const CatchForm = ({
    onSuccess,
}: {
    onSuccess: (data: CatchValues) => void;
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        setError,
        getValues,
    } = useForm<FormData>({ resolver: zodResolver(CatchSchema) });

    const onSubmit = (data: FormData) => {
        onSuccess({ ...data, authorName: userInfo?.username! });
        reset();
        toast.success('Catch published');
    };

    const [anchor, setAnchor] = useState<[number, number]>(
        getValues('coordinates') ?? [50.879, 4.6997],
    );

    const { isLoggedIn, userInfo } = useAuthContext();

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
                        minZoom={3}
                        defaultZoom={11}
                    >
                        <ZoomControl />
                        <Draggable
                            anchor={anchor}
                            onDragEnd={(newPos) => {
                                setValue('coordinates', newPos, {
                                    shouldValidate: true,
                                });
                                setAnchor(newPos);
                            }}
                        >
                            <Marker />
                        </Draggable>
                        <CurrentLocationButton
                            setCurrentPosition={(coordinates) => {
                                setValue('coordinates', coordinates);
                                setError('coordinates', { message: '' });
                                setAnchor(coordinates);
                            }}
                        />
                    </Map>
                    <ErrorMessage errorMessage={errors.coordinates?.message} />
                    <input type="submit" />
                </>
            ) : (
                <p>
                    <Link to={clientRoutes.LOG_IN}>Log in</Link> to share your
                    catch
                </p>
            )}
        </form>
    );
};
