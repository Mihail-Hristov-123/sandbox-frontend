import { useNavigate } from 'react-router';

import { AuthorField } from '../AuthorField';
import { clientRoutes } from '../../routes';
import type { QuestionReturnValue } from '../../schemas/questions/QuestionSchema';

export const QuestionCard = ({
    user_username,
    description,
    title,
    id,
}: QuestionReturnValue) => {
    const navigate = useNavigate();
    return (
        <article
            title="View details"
            onClick={() => navigate(clientRoutes.QUESTIONS + `/${id}`)}
            className="shadow-sm shadow-primary rounded-big p-6 hover:shadow-md  transition-shadow duration-300 cursor-pointer space-y-2"
        >
            <AuthorField name={user_username} />

            <h2 className="text-2xl font-semibold">{title}</h2>

            <p className="mb-4">{description}</p>
        </article>
    );
};
