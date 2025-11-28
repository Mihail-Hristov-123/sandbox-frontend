import { useNavigate } from 'react-router';
import profilePicPlaceholder from '../assets/user.png';
import { CLIENT_ROUTES } from '@/Routes';

interface Props {
    profilePictureLink: string | null;
    name: string;
    userId: number;
}

export const AuthorField = ({ profilePictureLink, name, userId }: Props) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`${CLIENT_ROUTES.USERS}/${userId}`);
    };

    return (
        <section
            onClick={handleClick}
            className="flex size-fit px-4 py-3 no-underline z-10 font-bold items-center shrink-0 rounded-small text-white cursor-pointer bg-primary gap-4"
        >
            <img
                src={profilePictureLink || profilePicPlaceholder}
                alt="Profile picture"
                className="w-10 avatar"
            />
            <p>{name}</p>
        </section>
    );
};
