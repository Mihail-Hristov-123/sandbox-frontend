import { useNavigate } from 'react-router';
import { AuthorField } from '@/components/AuthorField';
import { CLIENT_ROUTES } from '@/routes';
import type { Question } from '@/types';
import { DeleteButton } from '@/components/DeleteButton';
import { useCheckIsOwner } from '@/hooks/useCheckIsOwner';
import { useDeleteResource } from '@/hooks/useDeleteResource';

export const QuestionCard = ({
    user_username,
    description,
    title,
    id,
    user_id,
    profile_pic_url,
}: Question) => {
    const navigate = useNavigate();
    const { isOwner } = useCheckIsOwner(user_id);
    const { deleteResource: deleteQuestion } = useDeleteResource(
        'question',
        id,
    );
    return (
        <article
            title="View details"
            onClick={() => navigate(`${CLIENT_ROUTES.QUESTIONS}/${id}`)}
            className="shadow-sm shadow-primary rounded-big p-6 hover:shadow-md  transition-shadow duration-300 cursor-pointer space-y-2"
        >
            <div className="flex justify-between items-center">
                <AuthorField
                    userId={user_id}
                    name={user_username}
                    profilePictureLink={profile_pic_url}
                />
                {isOwner && <DeleteButton deleteResource={deleteQuestion} />}
            </div>

            <h2 className="text-2xl font-semibold">{title}</h2>

            <p className="mb-4">{description}</p>
        </article>
    );
};
