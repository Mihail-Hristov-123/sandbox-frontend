import type { AnswerReturnValues } from '../../schemas/questions/CommentSchema';
import { AuthorField } from '../AuthorField';

export const AnswerCard = (authorData: Partial<AnswerReturnValues>) => {
    return (
        <article className="border shadow-lg rounded-lg p-6 text-primary">
            <div className="flex justify-between flex-wrap">
                {' '}
                <p>{authorData.content}</p>
                <AuthorField name={authorData.user_username} />
            </div>
        </article>
    );
};
