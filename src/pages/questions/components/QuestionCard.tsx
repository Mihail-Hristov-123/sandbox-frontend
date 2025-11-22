import { useNavigate } from 'react-router';
import { AuthorField } from '@/components/AuthorField';
import { CLIENT_ROUTES } from '@/routes';
import type { Question } from '@/types';

export const QuestionCard = ({
    user_username,
    description,
    title,
    id,
    profile_pic_url,
}: Question) => {
    const navigate = useNavigate();
    return (
        <article
            title="View details"
            onClick={() => navigate(`${CLIENT_ROUTES.QUESTIONS}/${id}`)}
            className="shadow-sm shadow-primary rounded-big p-6 hover:shadow-md  transition-shadow duration-300 cursor-pointer space-y-2"
        >
            <AuthorField
                name={user_username}
                profilePictureLink={profile_pic_url}
            />

            <h2 className="text-2xl font-semibold">{title}</h2>

            <p className="mb-4">{description}</p>
        </article>
    );
};
