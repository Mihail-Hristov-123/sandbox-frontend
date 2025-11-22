import { Draggable, Map, Marker, ZoomControl } from 'pigeon-maps';
import { CurrentLocationButton } from './CurrentLocationButton';
import { ErrorMessage } from '@/components/formRelated/ErrorMessage';
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormSetValue,
} from 'react-hook-form';

import { useState } from 'react';
import type { CatchWithImage } from '../../schemas/CatchWithImageSchema';

interface Props {
    getValues: UseFormGetValues<CatchWithImage>;
    setValue: UseFormSetValue<CatchWithImage>;
    errors: FieldErrors<CatchWithImage>;
}

export const CoordinateSelection = ({ getValues, setValue, errors }: Props) => {
    const [anchor, setAnchor] = useState<[number, number]>([
        getValues('latitude') ?? 50.879,
        getValues('longitude') ?? 4.6997,
    ]);

    const updateCoordinates = (newPoint: [number, number]) => {
        const [latitude, longitude] = newPoint;
        setValue('latitude', latitude, {
            shouldValidate: true,
        });
        setValue('longitude', longitude, {
            shouldValidate: true,
        });

        setAnchor(newPoint);
    };

    return (
        <>
            <Map height={300} center={anchor} minZoom={4} defaultZoom={11}>
                <ZoomControl />
                <Draggable anchor={anchor} onDragEnd={updateCoordinates}>
                    <Marker />
                </Draggable>
                <CurrentLocationButton setCurrentPosition={updateCoordinates} />
            </Map>
            <ErrorMessage
                errorMessage={
                    (errors.latitude?.message || errors.longitude?.message) &&
                    'Catch coordinates are required'
                }
            />
        </>
    );
};
