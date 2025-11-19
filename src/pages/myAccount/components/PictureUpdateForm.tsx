import { ErrorMessage } from '@/components/formRelated/ErrorMessage';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '@/components/SubmitButton';
import { useUpdateProfilePicture } from '../hooks/useUpdateProfilePicture';

type FormValues = {
    image: FileList | null;
};

export const PictureUpdateForm = () => {
    const {
        register,
        watch,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const { updateProfilePicture, loading } = useUpdateProfilePicture();

    const fileList = watch('image');
    const imageFile = fileList?.[0] ?? null;

    const removeImage = () => resetField('image');

    const onSubmit = async () => {
        await updateProfilePicture(imageFile!, removeImage);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-2xl rounded-small flex flex-col items-center py-8 w-1/3 gap-8"
        >
            <h2 className="text-2xl font-semibold">Change profile picture</h2>
            {imageFile ? (
                <div className="flex flex-col items-center gap-4 w-full">
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        className="avatar w-2/3"
                    />

                    <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-500 text-xl"
                    >
                        Remove image
                    </button>
                </div>
            ) : (
                <label className="cursor-pointer w-full">
                    <div className="mx-20 h-36 rounded-small border-2 border-dashed border-gray-400 grid place-items-center gap-2 hover:border-primary hover:bg-gray-50 transition-colors">
                        <span>Click to upload</span>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register('image', {
                            required: {
                                message: 'Please provide an image',
                                value: true,
                            },
                        })}
                    />
                    <ErrorMessage
                        errorMessage={errors.image?.message}
                        className=" text-center pt-2"
                    />
                </label>
            )}

            <SubmitButton
                text="Update profile picture"
                className="m-0"
                disabled={loading}
            />
        </form>
    );
};
