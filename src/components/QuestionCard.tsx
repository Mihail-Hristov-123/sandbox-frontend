import type { Question } from '../pages/Discussions';
import { AuthorField } from './AuthorField';

export const QuestionCard = ({
    author,
    description,
    title,
    answers,
}: Question) => {
    return (
        <article className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <AuthorField name={author} />

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

            {answers.length > 0 && (
                <section className="mt-6 border-t border-gray-100 pt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                        Answers
                    </h3>
                    <div className="space-y-4">
                        {answers.map(({ author, content }, i) => (
                            <div
                                key={i}
                                className="bg-gray-50 p-4 rounded-md border border-gray-200"
                            >
                                <AuthorField name={author} />
                                <p className="text-gray-700 mb-2">{content}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
};
