import { useAuthContext } from '@/contexts/auth/useAuthContext';

import { PictureUpdateForm } from './components/PictureUpdateForm';
import { UserInfoCard } from '@/components/UserInfoCard';

export const MyAccount = () => {
    const { userInfo } = useAuthContext();
    const { email, profile_pic_url: profilePic, username } = userInfo!;
    return (
        <main className=" flex flex-col items-center gap-y-18">
            <h1 className="py-12">My information</h1>
            <UserInfoCard
                email={email}
                profilePic={profilePic}
                username={username}
            />
            <section className=" flex flex-col items-center gap-12 w-full">
                <h2 className="text-3xl font-bold">Settings</h2>
                <PictureUpdateForm />
            </section>
        </main>
    );
};
