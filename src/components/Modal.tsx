export const Modal = ({
    children,
    isOpened,
    close,
}: {
    children: React.ReactNode;
    isOpened: boolean;
    close: () => void;
}) => {
    if (!isOpened) {
        return null;
    }

    return (
        <div className="fixed inset-0  flex items-center justify-center bg-gray/20 backdrop-blur-sm px-8">
            <div className="rounded-big bg-white border-2 border-primary flex flex-col">
                <button
                    onClick={close}
                    className="hover:text-red-400 text-xl font-medium transition-colors duration-200 self-end m-4"
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};
