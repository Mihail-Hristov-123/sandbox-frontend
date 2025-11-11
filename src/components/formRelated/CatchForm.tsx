import { useForm } from 'react-hook-form';
import { type CatchValues } from '../cards/CatchCard';
import { LabelledInput } from './LabelledInput';
import { Draggable, Map, Marker, ZoomControl } from 'pigeon-maps';

import { useState } from 'react';
import { CurrentLocationButton } from '../maps/CurrentLocationButton';

type FormData = Omit<CatchValues, 'authorName'>;

export const CatchForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const [anchor, setAnchor] = useState<[number, number]>(
        getValues('coordinates') ?? [50.879, 4.6997],
    );
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form border-0 shadow-xl py-8 px-8 gap-8"
        >
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
                name="title"
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
                        setValue('coordinates', newPos);
                        setAnchor(newPos);
                    }}
                >
                    <Marker />
                </Draggable>
                <CurrentLocationButton
                    setCurrentPosition={(coordinates) => {
                        setValue('coordinates', coordinates);
                        setAnchor(coordinates);
                    }}
                />
            </Map>
            <input type="submit" />
        </form>
    );
};
