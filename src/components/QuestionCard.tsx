import type { Question } from '../pages/Questions';
import { AuthorField } from './AuthorField';

export const QuestionCard = ({ author, description, title }: Question) => {
    return (
        <article className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <AuthorField name={author} />

            <h2 className="text-2xl font-semibold text-gray-800 my-2">
                {title}
            </h2>

            <p className="text-gray-700 mb-4">{description}</p>
        </article>
    );
};
