import { useAuthContext } from '../../contexts/auth/useAuthContext';

import profilePicPlaceholder from '@/assets/user.png';
import { PictureUpdateForm } from './components/PictureUpdateForm';

export const MyAccount = () => {
    const { userInfo } = useAuthContext();
    return (
        <main className=" flex flex-col items-center gap-y-18">
            <h1 className="py-12">My information</h1>

            <div className="flex flex-col items-center shadow-xl rounded-small w-1/3 max-lg:w-2/3">
                <img
                    src={userInfo?.profile_pic_url || profilePicPlaceholder}
                    alt="Your profile picture"
                    className="w-3/4 avatar "
                />
                <dl className="w-full p-6 divide-y divide-secondary">
                    <div className="py-2 flex justify-between">
                        <dt>Username:</dt>
                        <dd>{userInfo?.username}</dd>
                    </div>
                    <div className="py-2 flex justify-between">
                        <dt>Email:</dt>
                        <dd>{userInfo?.email}</dd>
                    </div>
                </dl>
            </div>
            <section className=" flex flex-col items-center gap-12 w-full">
                <h2 className="text-3xl font-bold">Settings</h2>
                <PictureUpdateForm />
            </section>
        </main>
    );
};
