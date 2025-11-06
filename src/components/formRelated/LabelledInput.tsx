import type {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
} from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';



interface Props<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    errors: FieldErrors<T>;
    name: Path<T>;
    register: UseFormRegister<T>;
    className?: string;
}

export const LabelledInput = <T extends FieldValues>({
    labelText,
    errors,
    name,
    register,
    className = '',
    ...props
}: Props<T>) => {
    const errorMessage = errors[name]?.message;

    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={name}>{labelText}</label>

            <input
                id={name}
                {...register(name)}
                {...props}
                className={`border rounded-xl px-3 py-2  transition-all duration-300 
          ${errorMessage ? 'border-red-400' : 'border-gray-300'}
          ${className}`}
            />

            <ErrorMessage errorMessage={errorMessage}/>
        </div>
    );
};
