import { AuthorField } from '@/components/AuthorField';
import { DeleteButton } from '@/components/DeleteButton';
import { LikeButton } from '@/components/LikeButton';
import { useCheckIsOwner } from '@/hooks/useCheckIsOwner';
import { useLikesService } from '@/hooks/useLikesService';
import type { Answer } from '@/types';
import { useDeleteResource } from '@/hooks/useDeleteResource';

export const AnswerCard = ({
    info: { content, user_username, user_id, profile_pic_url, id },
    updateAnswers,
}: {
    info: Answer;
    updateAnswers: () => Promise<void>;
}) => {
    const { likedByUser, likesCount, likeOrDislike } = useLikesService(
        'answers',
        id,
    );

    const { isOwner } = useCheckIsOwner(user_id);
    const { deleteResource: deleteAnswer } = useDeleteResource(
        'answer',
        id,
        updateAnswers,
    );

    return (
        <>
            <article className="flex justify-between p-6 gap-6 items-center rounded-small shadow-md text-primary max-xl:flex-col max-xl:text-center ">
                <AuthorField
                    userId={user_id}
                    name={user_username}
                    profilePictureLink={profile_pic_url}
                />
                <p className=" wrap-anywhere w-3/4">{content}</p>

                {isOwner ? (
                    <DeleteButton deleteResource={deleteAnswer} />
                ) : (
                    <LikeButton
                        likesCount={likesCount}
                        likedByUser={likedByUser}
                        handleLike={likeOrDislike}
                    />
                )}
            </article>
        </>
    );
};
