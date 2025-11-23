import { AuthorField } from '@/components/AuthorField';
import { LikeButton } from '@/components/LikeButton';
import { useLikesService } from '@/hooks/useLikesService';
import type { Answer } from '@/types';

export const AnswerCard = ({
    content,
    user_username,
    user_id,
    profile_pic_url,
    id,
}: Answer) => {
    const { likedByUser, likesCount, likeOrDislike } = useLikesService(
        'answers',
        id,
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

                <LikeButton
                    likesCount={likesCount}
                    likedByUser={likedByUser}
                    handleLike={likeOrDislike}
                />
            </article>
        </>
    );
};
