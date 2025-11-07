import type { Question } from '../pages/Questions';
import { AuthorField } from './AuthorField';

export const QuestionCard = ({ author, description, title }: Question) => {
    return (
        <article className="shadow-sm shadow-primary rounded-big p-6 hover:shadow-md  transition-shadow duration-300 cursor-pointer space-y-2">
            <AuthorField name={author} />

            <h2 className="text-2xl font-semibold">{title}</h2>

            <p className="mb-4">{description}</p>
        </article>
    );
};
