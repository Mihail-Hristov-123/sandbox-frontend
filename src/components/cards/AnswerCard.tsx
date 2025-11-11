import { AuthorField } from '../AuthorField';

export const AnswerCard = ({
    content,
    username,
}: {
    content: string;
    username: string;
}) => {
    return (
        <article className="border w-full shadow-lg rounded-lg p-6 space-y-3 text-primary">
            <AuthorField name={username} />
            <p>{content}</p>
        </article>
    );
};
