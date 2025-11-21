import { AuthorField } from '@/components/AuthorField';
import { LikeButton } from '@/components/LikeButton';
import { useGetAnswerLikes } from '../hooks/useGetAnswerLikes';
import { useLikeAnswer } from '../hooks/useLikeAnswer';

export const AnswerCard = ({
    content,
    username,
    profile_pic_url,
    id,
}: {
    content: string;
    username: string;
    profile_pic_url: string | null;
    id: number;
}) => {
    const { likedByCurrentUser, likesCount, updateAnswerLikes } =
        useGetAnswerLikes(id);
    const { likeOrDislike } = useLikeAnswer(id);

    const handleLike = async () => {
        await likeOrDislike();
        await updateAnswerLikes();
    };

    return (
        <>
            <article className="flex justify-between p-6 gap-6 items-center rounded-small shadow-md text-primary">
                <AuthorField
                    name={username}
                    profilePictureLink={profile_pic_url}
                />
                <p className=" wrap-anywhere w-3/4">{content}</p>

                <LikeButton
                    likesCount={likesCount}
                    likedByUser={likedByCurrentUser}
                    handleLike={handleLike}
                />
            </article>
        </>
    );
};
