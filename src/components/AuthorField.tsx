import profilePicPlaceholder from '../assets/user.png';

interface Props {
    profilePictureLink?: string;
    name: string;
    autoDisplay?: boolean;
}

export const AuthorField = ({
    profilePictureLink,
    name,
    autoDisplay = false,
}: Props) => {
    return (
        <section
            className={`flex w-fit px-2 py-1 items-center shrink-0 rounded-small text-white cursor-pointer
                ${
                    autoDisplay
                        ? 'bg-secondary gap-2'
                        : 'hover:bg-secondary transition-colors duration-500 group'
                }`}
        >
            <img
                src={profilePictureLink || profilePicPlaceholder}
                alt="Profile picture"
                className="w-10"
            />
            <p
                className={`${
                    autoDisplay
                        ? ''
                        : 'max-w-0 overflow-hidden item-smooth-appear duration-500 whitespace-nowrap group-hover:pl-2 group-hover:max-w-20'
                }`}
            >
                {name}
            </p>
        </section>
    );
};
