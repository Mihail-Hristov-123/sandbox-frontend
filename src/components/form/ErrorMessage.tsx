export const ErrorMessage = ({ errorMessage }: { errorMessage: unknown }) => {
    if (!errorMessage) {
        return null;
    }
    return <p className="text-xs text-red-500 ">{String(errorMessage)}</p>;
};
