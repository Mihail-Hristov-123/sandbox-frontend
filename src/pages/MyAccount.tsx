import { useAuthContext } from '../contexts/auth/useAuthContext';
import { useForm } from 'react-hook-form';

type FormValues = {
    image: FileList | null;
};

export const MyAccount = () => {
    const { userInfo } = useAuthContext();

    const { register, watch, resetField } = useForm<FormValues>();

    const fileList = watch('image');
    const imageFile = fileList?.[0] ?? null;

    const removeImage = () => {
        resetField('image');
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

            <form>
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
                        {...register('image')}
                    />
                </label>
            </form>
        </main>
    );
};
