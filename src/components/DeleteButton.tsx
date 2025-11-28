import deleteSVG from '@/assets/delete.svg';

export const DeleteButton = () => {
    const handleDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (window.confirm('Do you really want to delete this publication?')) {
            console.log('Deleted');
        }
    };

    return (
        <button onClick={handleDeletion} title="Delete publication">
            <img src={deleteSVG} className="w-10" alt="Trashbin icon" />
        </button>
    );
};
