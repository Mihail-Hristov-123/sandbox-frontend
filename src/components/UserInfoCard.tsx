import profilePicPlaceholder from '@/assets/user.png';

interface Props {
    profilePic: string | null;
    username: string;
    email: string;
}

export const UserInfoCard = ({ profilePic, username, email }: Props) => (
    <div className="flex flex-col items-center shadow-xl rounded-small w-1/3 max-lg:w-2/3">
        <img
            src={profilePic ?? profilePicPlaceholder}
            alt="Your profile picture"
            className="w-3/4 avatar "
        />
        <dl className="w-full p-6 divide-y divide-secondary">
            <div className="py-2 flex justify-between">
                <dt>Username:</dt>
                <dd>{username}</dd>
            </div>
            <div className="py-2 flex justify-between">
                <dt>Email:</dt>
                <dd>{email}</dd>
            </div>
        </dl>
    </div>
);
