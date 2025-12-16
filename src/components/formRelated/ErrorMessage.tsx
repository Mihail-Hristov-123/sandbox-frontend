export const ErrorMessage = ({
    errorMessage,
    className,
}: {
    errorMessage: unknown;
    className?: string;
}) => {
    if (!errorMessage) {
        return null;
    }

    return (
        <p className={`text-red-400 ${className} `} role="alert">
            {typeof errorMessage === 'string' ? errorMessage : 'Invalid input'}
        </p>
    );
};
