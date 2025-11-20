import { SubmitButton } from '@/components/SubmitButton';
import { useUpdateProfilePicture } from '../hooks/useUpdateProfilePicture';
import { PictureInput } from '@/components/formRelated/PictureInput';
import { useState, type FormEvent } from 'react';

export const PictureUpdateForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { updateProfilePicture, loading } = useUpdateProfilePicture();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError('Please provide a profile picture');
            return;
        }

        await updateProfilePicture(image, () => setImage(null));
        setError(null);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="shadow-2xl rounded-small flex flex-col items-center py-8 max-lg:w-full w-1/3 gap-8"
        >
            <h2 className="text-2xl font-semibold">Change profile picture</h2>
            <PictureInput
                image={image}
                setImage={setImage}
                error={error}
                inputClassName="px-12"
            />
            <SubmitButton
                text="Update profile picture"
                className="m-0"
                disabled={loading}
            />
        </form>
    );
};
