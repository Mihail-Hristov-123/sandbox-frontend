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
        <p className={`text-error ${className} `}>
            {typeof errorMessage === 'string' ? errorMessage : 'Invalid input'}
        </p>
    );
};
