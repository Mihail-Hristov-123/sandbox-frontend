import deleteSVG from '@/assets/delete.svg';

export const DeleteButton = ({
    deleteResource,
}: {
    deleteResource: () => Promise<void>;
}) => {
    const handleDeletion = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (
            window.confirm(
                'Are you sure you want to delete this? This action cannot be undone.',
            )
        ) {
            await deleteResource();
        }
    };

    return (
        <button onClick={handleDeletion} title="Delete publication">
            <img src={deleteSVG} className="w-10" alt="Trashbin icon" />
        </button>
    );
};
