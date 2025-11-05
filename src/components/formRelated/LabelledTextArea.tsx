import type {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
} from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

interface Props<T extends FieldValues>
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    labelText: string;
    errors: FieldErrors<T>;
    name: Path<T>;
    register: UseFormRegister<T>;
    className?: string;
}

export const LabelledTextArea = <T extends FieldValues>({
    labelText,
    errors,
    name,
    register,
    className = '',
    ...props
}: Props<T>) => {
    const errorMessage = errors[name]?.message;

    return (
        <div>
            <label htmlFor={name}>{labelText}</label>
            <textarea
                className={`border w-full max-h-[30vh] min-h-[2em] p-1 indent-2 rounded-md ${errorMessage ? 'border-red-400' : 'border-gray-300'} ${className}`}
                id={name}
                {...register(name)}
                {...props}
                placeholder="Share your thoughts..."
                {...props}
                name={name}
            />
            <ErrorMessage errorMessage={errorMessage} />
        </div>
    );
};
