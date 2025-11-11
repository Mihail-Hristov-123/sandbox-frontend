import profilePicPlaceholder from '../assets/user.png';

interface Props {
    profilePictureLink?: string;
    name: string;
}

export const AuthorField = ({ profilePictureLink, name }: Props) => {
    return (
        <section className="flex w-fit px-2 py-1 items-center shrink-0 bg-primary rounded-small text-white cursor-pointer font-semibold gap-2">
            <img
                src={profilePictureLink || profilePicPlaceholder}
                alt="Profile picture"
                className="w-10"
            />
            <p>{name}</p>
        </section>
    );
};
