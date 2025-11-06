import type { Question } from '../pages/Questions';
import { AuthorField } from './AuthorField';

export const QuestionCard = ({ author, description, title }: Question) => {
    return (
        <article className="bg-primary text-white shadow-sm rounded-big p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <AuthorField name={author} />

            <h2 className="text-2xl font-semibold">{title}</h2>

            <p className="mb-4">{description}</p>
        </article>
    );
};
