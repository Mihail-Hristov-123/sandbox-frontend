import type { AnswerReturnValues } from '../../schemas/questions/CommentSchema';

export const AnswerCard = (authorData: AnswerReturnValues) => {
    return (
        <article className="border  bg-secondary rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-white leading-relaxed">{authorData.content}</p>
        </article>
    );
};
