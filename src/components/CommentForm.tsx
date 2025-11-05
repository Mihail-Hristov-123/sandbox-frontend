import { useForm } from 'react-hook-form';
import { LabelledTextArea } from './form/LabelledTextArea';

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
            <LabelledTextArea
                labelText="Your comment:"
                register={register}
                errors={errors}
                name="content"
            />
            <input
                type="submit"
                value="Post Comment"
                className="bg-gray-700 text-white rounded-md px-3 py-1 cursor-pointer hover:bg-gray-600 transition-all"
            />
        </form>
    );
};
