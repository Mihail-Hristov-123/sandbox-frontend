import { AuthorField } from '@/components/AuthorField';

export const AnswerCard = ({
    content,
    username,
    profile_pic_url,
}: {
    content: string;
    username: string;
    profile_pic_url: string;
}) => {
    return (
        <>
            <article className="flex p-6 gap-6 items-center rounded-small shadow-md text-primary">
                <AuthorField
                    name={username}
                    profilePictureLink={profile_pic_url}
                />
                <p className=" wrap-anywhere">{content}</p>
            </article>
        </>
    );
};
