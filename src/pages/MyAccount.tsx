import { ErrorMessage } from '@/components/formRelated/ErrorMessage';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '@/components/SubmitButton';
import { useApi } from '@/hooks/useApi';
import { createApiRoute } from '@/utils/createApiRoute';
import { SERVER_ROUTES } from '@/routes';

type FormValues = {
    image: FileList | null;
};

export const MyAccount = () => {
    const { userInfo } = useAuthContext();

    const {
        register,
        watch,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const fileList = watch('image');
    const imageFile = fileList?.[0] ?? null;
    const { fetchWithAuthCheck } = useApi();
    const removeImage = () => {
        resetField('image');
    };
    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('image', imageFile!);
        const response = await fetchWithAuthCheck(`/@api/users/upload-file`, {
            method: 'POST',
            body: formData,
        });
        console.log(response);
    };

    return (
        <main>
            <h1>My Account</h1>

            <div className="flex flex-col gap-20 w-full items-center">
                <dl className="max-w-md w-full bg-bg shadow-md rounded-small p-6 divide-y divide-secondary">
                    <div className="py-2 flex justify-between">
                        <dt>Username:</dt>
                        <dd>{userInfo?.username}</dd>
                    </div>
                    <div className="py-2 flex justify-between">
                        <dt>Email:</dt>
                        <dd>{userInfo?.email}</dd>
                    </div>
                </dl>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {imageFile && (
                    <div>
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="The image you uploaded"
                        />
                        <button type="button" onClick={removeImage}>
                            Remove image
                        </button>
                    </div>
                )}

                <label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image', {
                            required: {
                                message: 'Image is required',
                                value: true,
                            },
                        })}
                    />
                    <ErrorMessage errorMessage={errors.image?.message} />
                </label>
                <SubmitButton text="Update profile picture" />
            </form>
        </main>
    );
};
