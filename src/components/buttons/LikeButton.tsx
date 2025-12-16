import likedSvg from '@/assets/like-active.svg';
import nonLikedSVG from '@/assets/like-inactive.svg';

interface Props {
    likedByUser?: boolean;
    likesCount: number;
    handleLike: () => void;
}

export const LikeButton = ({ likedByUser, likesCount, handleLike }: Props) => {
    const additionalText = likedByUser ? 'Unlike' : 'Like';

    return (
        <div className="flex items-center gap-3 bg-accent px-4 py-2 rounded-xl">
            <button
                onClick={handleLike}
                className="min-w-fit"
                title={additionalText}
            >
                <img
                    src={likedByUser ? likedSvg : nonLikedSVG}
                    alt={`${additionalText} icon`}
                    className={`w-6 transition-transform ${likedByUser && 'scale-110'}`}
                />
            </button>
            <span>{likesCount}</span>
        </div>
    );
};
