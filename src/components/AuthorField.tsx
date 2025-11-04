import profilePicPlaceholder from '../assets/profile-pic-white.svg';
interface Props {
    profilePictureLink?: string;
    name: string;
}

export const AuthorField = ({ profilePictureLink, name }: Props) => (
    <section className="flex bg-gray-700 w-fit px-2 py-1 group rounded-2xl items-center text-white">
        <img
            src={profilePictureLink || profilePicPlaceholder}
            alt="Profile picture"
            className=" w-0 opacity-0 group-hover:opacity-100 group-hover:w-10 group-hover:mr-2 duration-200 transition-all"
        />
        <p className=" text-xl">{name}</p>
    </section>
);
