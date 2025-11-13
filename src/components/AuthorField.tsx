import profilePicPlaceholder from '../assets/user.png';

interface Props {
    profilePictureLink?: string;
    name: string;
}

export const AuthorField = ({ profilePictureLink, name }: Props) => {
    return (
        <section className="flex size-fit px-3 py-2 font-bold items-center shrink-0 rounded-small text-white cursor-pointer bg-primary gap-2">
            <img
                src={profilePictureLink || profilePicPlaceholder}
                alt="Profile picture"
                className="w-10"
            />
            <p>{name}</p>
        </section>
    );
};
