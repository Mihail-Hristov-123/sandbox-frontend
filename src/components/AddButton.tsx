import plusSVG from '../assets/plus.svg';

export const AddButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="bg-primary flex text-white border border-white px-4 py-2 font-medium text-xl rounded-big  items-center fixed right-4 bottom-8 shadow-2xl group"
            onClick={onClick}
        >
            Add
            <img
                src={plusSVG}
                className="w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 group-hover:ml-2 transition-all duration-200"
                alt=""
            />
            <span className="absolute -right-1 -top-1 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-100"></span>
                <span className="relative inline-flex size-3 rounded-full bg-accent"></span>
            </span>
        </button>
    );
};
