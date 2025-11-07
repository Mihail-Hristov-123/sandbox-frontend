import profilePicPlaceholder from '../assets/user.png';
interface Props {
    profilePictureLink?: string;
    name: string;
}

export const AuthorField = ({ profilePictureLink, name }: Props) => (
    <section className="flex bg-secondary w-fit px-2 py-1 group rounded-small items-center text-white">
        <img
            src={profilePictureLink || profilePicPlaceholder}
            alt="Profile picture"
            className="w-0 item-smooth-appear group-hover:w-10 group-hover:mr-2"
        />
        <p className=" text-xl">{name}</p>
    </section>
);
