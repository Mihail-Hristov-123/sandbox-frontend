import { useParams } from 'react-router';
import { useGetUserDetails } from './hooks/useGetUserDetails';
import { UserInfoCard } from '@/components/UserInfoCard';
import { CatchCard } from '../catches/components/CatchCard';
import { Loader } from '@/components/Loader';

export const UserDetails = () => {
    const { userId } = useParams();
    const { userDetails, loading } = useGetUserDetails(Number(userId));

    if (loading) {
        return (
            <main className="h-screen">
                <Loader />
            </main>
        );
    }

    if (!userDetails) {
        return (
            <main>
                <h1>This user does not exist</h1>;
            </main>
        );
    }

    const { email, username, profile_pic_url } = userDetails.user;

    return (
        <main className="flex flex-col items-center gap-16">
            <h1>{userDetails.user.username}'s profile page</h1>

            <UserInfoCard
                email={email}
                profilePic={profile_pic_url}
                username={username}
            />

            <h2 className="text-3xl pt-8 font-semibold">Latest catches</h2>

            <section>
                {userDetails.catches.length ? (
                    <div className="px-20 flex flex-col gap-10 items-center">
                        {userDetails.catches.map((catchInfo) => (
                            <CatchCard key={catchInfo.id} {...catchInfo} />
                        ))}
                    </div>
                ) : (
                    <p>{username} has not shared any of their catches yet.</p>
                )}
            </section>
        </main>
    );
};
