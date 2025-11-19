import profilePicPlaceholder from '../assets/user.png';

interface Props {
    profilePictureLink?: string;
    name: string;
}

export const AuthorField = ({ profilePictureLink, name }: Props) => {
    return (
        <section className="flex size-fit px-4 py-3 font-bold items-center shrink-0 rounded-small text-white cursor-pointer bg-primary gap-4">
            <img
                src={profilePictureLink || profilePicPlaceholder}
                alt="Profile picture"
                className="w-10 avatar"
            />
            <p>{name}</p>
        </section>
    );
};
