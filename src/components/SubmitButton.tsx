export const SubmitButton = ({
    text,
    className,
    disabled,
}: {
    text: string;
    className?: string;
    disabled?: boolean;
}) => (
    <button
        type="submit"
        disabled={disabled}
        className={`text-white bg-primary rounded-small py-3 px-4 text-2xl  font-bold ${disabled && 'cursor-not-allowed'} ${className}`}
    >
        {text}
    </button>
);
