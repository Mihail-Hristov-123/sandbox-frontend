import { SubmitButton } from '@/components/buttons/SubmitButton';
import { useUpdateProfilePicture } from '../hooks/useUpdateProfilePicture';
import { PictureInput } from '@/components/formRelated/PictureInput';
import { Controller, useForm } from 'react-hook-form';

interface FormData {
    image: File;
}

export const PictureUpdateForm = () => {
    const { updateProfilePicture, loading } = useUpdateProfilePicture();
    const { control, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        await updateProfilePicture(data.image, reset);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-2xl rounded-small flex flex-col items-center py-8 max-lg:w-full w-1/3 gap-8"
        >
            <h2 className="text-2xl font-semibold">Change profile picture</h2>
            <Controller
                name="image"
                control={control}
                rules={{ required: 'Please select an image' }}
                render={({ field, fieldState: { error } }) => (
                    <PictureInput
                        image={field.value}
                        setImage={(file: File | null) => field.onChange(file)}
                        error={error?.message}
                        inputClassName="px-12"
                    />
                )}
            />
            <SubmitButton
                text="Update profile picture"
                className="m-0"
                disabled={loading}
            />
        </form>
    );
};
