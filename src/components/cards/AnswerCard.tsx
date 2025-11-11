import { AuthorField } from '../AuthorField';

export const AnswerCard = ({
    content,
    username,
}: {
    content: string;
    username: string;
}) => {
    return (
        <article className="flex shadow-xl rounded-big p-6 gap-6 items-center text-primary">
            <AuthorField name={username} />
            <p className="break-all">{content}</p>
        </article>
    );
};
