import likedSvg from '@/assets/like-active.svg';
import nonLikedSVG from '@/assets/like-inactive.svg';

interface Props {
    likedByUser?: boolean;
    likesCount: number;
    handleLike: () => void;
}

export const LikeButton = ({ likedByUser, likesCount, handleLike }: Props) => (
    <button onClick={handleLike} className="min-w-fit">
        <img
            src={likedByUser ? likedSvg : nonLikedSVG}
            alt="Like/unlike icon"
            className="w-6"
        />
        <span>{likesCount}</span>
    </button>
);
