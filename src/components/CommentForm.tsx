import { useForm } from 'react-hook-form';

interface FormValues {
    content: string;
}

export const CommentForm = ({
    addComment,
}: {
    addComment?: (comment: string) => void;
}) => {
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        addComment?.(data.content);
        resetField('content');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <textarea
                className="border-2 border-gray-700 w-full max-h-[30vh] min-h-[2em] p-1 indent-2 rounded-md"
                {...register('content', {
                    required: 'Please enter a comment',
                    minLength: {
                        value: 5,
                        message: 'Comment must be at least 5 characters long',
                    },
                    maxLength: {
                        value: 200,
                        message: 'Comment cannot exceed 200 characters',
                    },
                })}
                placeholder="Share your thoughts..."
            />
            {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
            <input
                type="submit"
                value="Post Comment"
                className="bg-gray-700 text-white rounded-md px-3 py-1 cursor-pointer hover:bg-gray-600 transition-all"
            />
        </form>
    );
};
