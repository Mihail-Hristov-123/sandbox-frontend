export const SubmitButton = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => (
    <button
        type="submit"
        className={`text-white bg-primary rounded-small py-3 px-4 text-2xl  font-bold ${className}`}
    >
        {text}
    </button>
);
