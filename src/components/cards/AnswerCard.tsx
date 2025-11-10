import { AuthorField } from '../AuthorField';

export const AnswerCard = ({
    content,
    username,
}: {
    content: string;
    username: string;
}) => {
    return (
        <article className="border w-full shadow-lg rounded-lg p-6 text-primary">
            <div className="flex justify-between">
                <p>{content}</p>
                <AuthorField name={username} />
            </div>
        </article>
    );
};
