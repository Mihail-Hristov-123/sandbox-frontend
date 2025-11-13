import { AuthorField } from '../AuthorField';

export const AnswerCard = ({
    content,
    username,
}: {
    content: string;
    username: string;
}) => {
    return (
        <>
            <article className="flex p-6 gap-6 items-center rounded-small shadow-md text-primary">
                <AuthorField name={username} />
                <p className=" wrap-anywhere">{content}</p>
            </article>
        </>
    );
};
